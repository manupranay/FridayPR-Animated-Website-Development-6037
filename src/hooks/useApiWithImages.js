import { useState, useEffect } from 'react';

const useApiWithImages = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataWithImages = async () => {
      try {
        setLoading(true);
        
        // Try to use _embed first to reduce API calls
        const embedUrl = url.includes('?') ? `${url}&_embed` : `${url}?_embed`;
        
        let response = await fetch(embedUrl, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });

        if (!response.ok) {
          // Fallback to regular URL if _embed fails
          response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              ...options.headers
            },
            ...options
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const result = await response.json();
        
        // Process the data to extract featured images
        const processedData = await Promise.all(
          (Array.isArray(result) ? result : [result]).map(async (item) => {
            let featuredImageUrl = null;
            
            try {
              // Try to get image from _embedded first
              if (item._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                featuredImageUrl = item._embedded['wp:featuredmedia'][0].source_url;
              }
              // Fallback to manual API call if _embed didn't work
              else if (item.featured_media && item.featured_media !== 0) {
                const mediaResponse = await fetch(
                  `https://api.fridaypr.com/wp-json/wp/v2/media/${item.featured_media}`
                );
                if (mediaResponse.ok) {
                  const mediaData = await mediaResponse.json();
                  featuredImageUrl = mediaData.source_url;
                }
              }
            } catch (mediaError) {
              console.warn('Failed to fetch featured media:', mediaError);
            }

            return {
              ...item,
              featuredImageUrl: featuredImageUrl || generateFallbackImage(item)
            };
          })
        );

        setData(Array.isArray(result) ? processedData : processedData[0]);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchDataWithImages();
    }
  }, [url]);

  return { data, loading, error };
};

// Generate fallback gradient images based on content type and ID
const generateFallbackImage = (item) => {
  const gradients = [
    'linear-gradient(135deg, #00D4CC 0%, #6C63FF 100%)',
    'linear-gradient(135deg, #FF6B35 0%, #00D4CC 100%)',
    'linear-gradient(135deg, #6C63FF 0%, #FF6B35 100%)',
    'linear-gradient(135deg, #10B981 0%, #00D4CC 100%)',
    'linear-gradient(135deg, #FF10F0 0%, #6C63FF 100%)'
  ];
  
  const gradientIndex = item.id % gradients.length;
  
  return {
    type: 'gradient',
    gradient: gradients[gradientIndex],
    fallback: true
  };
};

export default useApiWithImages;
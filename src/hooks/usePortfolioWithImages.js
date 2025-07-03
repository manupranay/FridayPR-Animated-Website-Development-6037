import { useState, useEffect } from 'react';

const usePortfolioWithImages = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioWithImages = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Process the data to extract project images
        const processedData = await Promise.all(
          (Array.isArray(result) ? result : [result]).map(async (item) => {
            let projectImageUrl = null;
            
            try {
              // First try to get image from acf.project_images
              if (item.acf?.project_images) {
                const mediaResponse = await fetch(
                  `https://api.fridaypr.com/wp-json/wp/v2/media/${item.acf.project_images}`
                );
                if (mediaResponse.ok) {
                  const mediaData = await mediaResponse.json();
                  projectImageUrl = mediaData.source_url;
                }
              }
              
              // Fallback to featured_media if project_images fails
              if (!projectImageUrl && item.featured_media && item.featured_media !== 0) {
                const mediaResponse = await fetch(
                  `https://api.fridaypr.com/wp-json/wp/v2/media/${item.featured_media}`
                );
                if (mediaResponse.ok) {
                  const mediaData = await mediaResponse.json();
                  projectImageUrl = mediaData.source_url;
                }
              }
            } catch (mediaError) {
              console.warn('Failed to fetch project media:', mediaError);
            }

            return {
              ...item,
              projectImageUrl: projectImageUrl || generateFallbackImage(item),
              // Parse ACF fields for easier access
              acf: {
                ...item.acf,
                client_name: item.acf?.client_name || null,
                tools_used: item.acf?.tools_used || null,
                project_url: item.acf?.project_url || null,
                the_challenge: item.acf?.the_challenge || null,
                our_solution: item.acf?.our_solution || null,
                results_achieved: item.acf?.results_achieved || null,
                key_features: item.acf?.key_features || null,
                project_images: item.acf?.project_images || null
              }
            };
          })
        );

        setData(Array.isArray(result) ? processedData : processedData[0]);
      } catch (err) {
        setError(err.message);
        console.error('Portfolio API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPortfolioWithImages();
    }
  }, [url]);

  return { data, loading, error };
};

// Generate fallback gradient images based on project ID
const generateFallbackImage = (item) => {
  const gradients = [
    'linear-gradient(135deg, #00D4CC 0%, #6C63FF 100%)',
    'linear-gradient(135deg, #FF6B35 0%, #00D4CC 100%)',
    'linear-gradient(135deg, #6C63FF 0%, #FF6B35 100%)',
    'linear-gradient(135deg, #10B981 0%, #00D4CC 100%)',
    'linear-gradient(135deg, #FF10F0 0%, #6C63FF 100%)',
    'linear-gradient(135deg, #00D4CC 0%, #FF6B35 100%)'
  ];
  
  const gradientIndex = item.id % gradients.length;
  
  return {
    type: 'gradient',
    gradient: gradients[gradientIndex],
    fallback: true
  };
};

export default usePortfolioWithImages;
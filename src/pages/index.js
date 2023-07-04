import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/url_collector', {
          topic: 'Apple Vision Pro',
          numResults: 3
        });
        setUrls(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Urls found for the topic:</h2>
          <ul>
            {urls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;

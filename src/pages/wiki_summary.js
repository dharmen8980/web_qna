import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wiki_summary = () => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/wikipedia-search?query=Apple Vision Pro');
        const data = response.data;
        console.log(data);
        setSummary(data.page);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Wiki Summary</h1>
      <p>{summary}</p>
    </div>
  );
};

export default Wiki_summary;

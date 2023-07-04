import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UrlSummary = () => {
  const [sentences, setSentences] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/qna', {
          topic: "Tiger",
          numResults: 3,
        });
        setSentences(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Url Summary</h1>
      {sentences}
    </div>
  );
};

export default UrlSummary;

import React, { useState } from 'react';
import axios from 'axios';

const Question_answer = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Hello');

  const askQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/completion', {
        question,
      });
      console.log(response.data);
      setAnswer(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Question & Answer</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askQuestion}>Ask</button>
      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
      {answer}
    </div>
  );
};

export default Question_answer;

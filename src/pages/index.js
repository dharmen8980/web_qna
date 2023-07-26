import React from "react";
import Axios from "axios";
import { useState } from "react";

const Home = () => {
  const [answer, setAnswer] = useState(null); // State to store the answer
  const [topicExist, setTopicExist] = useState(false); // State to check if the topic exists
  const [loading, setLoading] = useState(false); // State to check if the answer is loading
  const [searchingTopic, setSearchingTopic] = useState(false); // State to check if the topic is being searched

  // Function to send the topic to the server to retrive the content
  const topicSubmission = (e) => {
    setSearchingTopic(true);
    e.preventDefault();
    Axios.post("/api/getTopic", {
      topic: e.target.topic.value,
    }).then(() => {
      setSearchingTopic(false);
      setTopicExist(true);
    });
  };

  // Function to send the question to the server to retrive the answer
  const retriveAnswer = (e) => {
    setLoading(true);
    e.preventDefault();
    Axios.post("/api/askQuestions", {
      question: e.target.question.value,
    })
      .then((response) => {
        setAnswer(response.data.answer);
      })
      .then(() => {
        setLoading(false);
        form.reset();
      });
  };

  return (
    <main className="max-w-[1000px] mx-auto px-6">
      <title>Discussion Land</title>
      <meta
        name="description"
        content="A program that accepts a topic as a string input from the user, searches the internet for information about it, and answers any questions regarding the topic. "
      />
      <meta name="author" content="Dharmendra Sharma" />
      <meta
        name="keywords"
        content="chatbot, openai, gpt3, react, web-scrapping, QnA, discussion, discussion-land"
      />

      <h1 className="text-5xl text-center mt-10 font-serif font-extrabold">
        Welcome to Discussion Land!
      </h1>

      <div className="flex mt-8 justify-around">
        <h2 className="flex flex-col text-lg items-center justify-center">
          Hi! I am a Discussion-bot who is ready to search your topic over the
          internet and answer any question you have regarding the topic or even
          beyond the topic.
        </h2>
        <div className="max-w-[500px]">
          <img src="/meilleur-chatbot.jpg" alt="chatbot" />
        </div>
      </div>

      <form
        onSubmit={topicSubmission}
        className="mx-auto w-fit mt-16 flex flex-row justify-between items-center"
      >
        <label className="text-xl font-semibold">Enter your Topic:</label>
        <input
          className="border-2 border-black rounded-lg max-w-[200px] mx-3 px-4 py-2"
          type="text"
          name="topic"
        />
        <input
          type="submit"
          value={"Feed me!"}
          className="bg-black text-white hover:opacity-75 cursor-pointer rounded-lg px-4 py-2"
        />
      </form>

      {searchingTopic && (
        <h2 className="text-4xl text-center font-bold mt-14 animate-bounce">
          Searching for the topic ...
        </h2>
      )}

      {topicExist && (
        <form id="form" onSubmit={retriveAnswer} className="mt-14">
          <h2 className="text-4xl text-center font-bold mb-10">
            Lets Start Our Discussion Now!
          </h2>

          <label className="text-xl font-semibold">
            What would you like to know?
          </label>
          <div className="flex flex-row justify-between">
            <input
              className="border-2 border-black rounded-lg w-full px-4 py-1"
              type="text"
              name="question"
            />
            <input
              type="submit"
              value={"Ask me!"}
              className="bg-black text-white hover:opacity-75  cursor-pointer rounded-lg px-3 py-1 ml-3"
            />
          </div>

          <div className="bg-gray-200 rounded-lg">
            {loading ? (
              <h3 className="text-4xl text-center my-8 py-4 animate-bounce">
                Thinking ...
              </h3>
            ) : (
              <p className="px-4 my-8 py-4 text-md">
                {answer ? answer : "Ask me anything!"}
              </p>
            )}
          </div>
        </form>
      )}
    </main>
  );
};

export default Home;

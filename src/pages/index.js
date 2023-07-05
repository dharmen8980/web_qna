import React from "react";
import Axios from "axios";
import { useState } from "react";

const Home = () => {
  const [answer, setAnswer] = useState(null);
  const [topicExist, setTopicExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const topicSubmission = (e) => {
    e.preventDefault();
    Axios.post("https://web-qna.vercel.app/api/getTopic", {
      topic: e.target.topic.value,
    }).then(() => {
      setTopicExist(true);
    });
  };

  const retriveAnswer = (e) => {
    setLoading(true);
    e.preventDefault();
    Axios.post("https://web-qna.vercel.app/api/askQuestions", {
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
              <h3 className="text-4xl text-center my-8 py-4 animate-bounce">Thinking ...</h3>
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

// Import necessary packages to establish connection with the OpenAI API
import { Configuration, OpenAIApi } from "openai";
import { content } from "./getTopic";

// Create a configuration object to store the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of the OpenAI API
const openai = new OpenAIApi(configuration);

// instruction for the chatbot
var instruction =
  "You are a helpful assistant who utilizes the given information to answer questions outside of your knowledge:\n" +
  content;

// Create a variable to store the messages between the user and the chatbot
var messages = [{ role: "system", content: instruction }];

// Api handler to answer the questions asked by the user
export default async function handler(req, res) {
  if (req.method === "POST") {
    const question = req.body.question || "";
    if (question.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid question/prompt.",
        },
      });
      return;
    }

    try {
      messages.push({ role: "user", content: question });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: messages,
      });

      const answer = completion.data.choices[0].message.content;
      res.status(200).json({ answer });

      // Add the answer to the messages array
      messages.push({ role: "assistant", content: answer });
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

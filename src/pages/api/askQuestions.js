import { Configuration, OpenAIApi } from "openai";
import { content } from "./getTopic";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

var instruction =
  "You are a helpful assistant who utilizes the given information to answer questions outside of your knowledge:\n" +
  content;
var messages = [{ role: "system", content: instruction }];

console.log(instruction);
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
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const answer = completion.data.choices[0].message.content;
      res.status(200).json({ answer });
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

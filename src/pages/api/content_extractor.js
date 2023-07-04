import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    const sentences = await extractSentences(url);
    res.status(200).json(sentences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function extractSentences(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const paragraphs = $("p");
    const sentences = [];
    paragraphs.each((index, element) => {
      const paragraphText = $(element).text();
      const paragraphSentences = paragraphText.split(". ");
      sentences.push(...paragraphSentences);
    });
    return sentences;
  } catch (error) {
    console.error(error);
    return [];
  }
}

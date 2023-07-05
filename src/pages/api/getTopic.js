import googleIt from "google-it";
import wiki from "wikijs";
import axios from "axios";
import cheerio from "cheerio";

var content = " ";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { topic } = req.body;

    content = (await wiki_search(topic)).page;

    if (content === undefined || content === "Page not found") {
      try {
        content = await extractSentences(topic);
        console.log(content);
        res.status(200).json(content);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(200).json(content);

      console.log(content);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export { content };

async function google_Search(topic) {
  const urls = [];
  const options = {
    query: topic,
    limit: 4,
  };

  try {
    const results = await googleIt(options);
    for (const result of results) {
      urls.push(result.link);
    }
    return urls;
  } catch (error) {
    throw new Error("Error performing Google search");
  }
}

async function wiki_search(topic) {
  try {
    var page = [];
    const words = topic.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const capitalizedTopic = capitalizedWords.join(" ");

    page = await wiki()
      .page(capitalizedTopic)
      .then((page) => page.rawContent());

    if (page.length < 15000) {
      return { page };
    } else {
      page = await wiki()
        .page(capitalizedTopic)
        .then((page) => page.summary());
      return { page };
    }
  } catch (error) {
    return { error: "Page not found" };
  }
}

async function extractSentences(topic) {
  const urls = await google_Search(topic);
  const sentences = [];
  let totalLength = 0; // Track the total length of the sentences

  try {
    for (const url of urls) {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const paragraphs = $("p");

      for (const paragraph of paragraphs) {
        const paragraphText = $(paragraph).text();
        const paragraphLength = paragraphText.length;

        if (paragraphLength <= 5000 && totalLength + paragraphLength <= 15000) {
          const paragraphSentences = paragraphText.split(". ");

          for (const sentence of paragraphSentences) {
            const sentenceLength = sentence.length;

            if (totalLength + sentenceLength <= 15000) {
              sentences.push(sentence);
              totalLength += sentenceLength;
            } else {
              break; // Break the loop if the sentence exceeds the total limit
            }
          }

          if (totalLength >= 15000) {
            break; // Break the loop if the total length exceeds the limit
          }
        }
      }

      if (totalLength >= 15000) {
        break; // Break the loop if the total length exceeds the limit
      }
    }

    return sentences;
  } catch (error) {
    console.error(error);
    return [];
  }
}

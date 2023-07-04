import googleIt from 'google-it';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { topic, numResults } = req.body;

    try {
      const urls = await google_Search(topic, numResults);
      res.status(200).json(urls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function google_Search(topic, numResults) {
  const urls = [];
  const options = {
    query: topic,
    limit: numResults+1
  };

  try {
    const results = await googleIt(options);
    for (const result of results) {
      urls.push(result.link);
    }
    return urls;
  } catch (error) {
    throw new Error('Error performing Google search');
  }
}

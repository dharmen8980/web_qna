import wiki from "wikijs";

export default async function handler(req, res) {
  const { query } = req.query;
  const page = await wiki()
    .page(query)
    .then((page) => page.rawContent());
  const summary = await wiki()
    .page(query)
    .then((page) => page.summary());

  if (!page) {
    res.status(404).json({ error: "Page not found" });
  } else {
    if (page.length < 10000) {
      res.status(200).json({ page });
    } else {
      res.status(200).json({ summary });
    }
  }
}

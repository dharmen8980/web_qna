// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var messages = "Hello world";
export default function handler(req, res) {
  if(req.method === 'POST'){
    messages = req.body.message;
  res.status(200).json({ messages })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export { messages};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { messages } from './hello';

const messages = process.env.MESSAGE;

export default function handler(req, res) {
  if(req.method === 'GET'){
    console.log(messages);
  res.status(200).json({ messages })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
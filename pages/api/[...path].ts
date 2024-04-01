// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest } from "next/server";



const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export default  async function handler(
  req: NextRequest
) {
  const apiKey = process.env.OPENAI_API_KEY;
  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }
  
  // const openaiPath = ((req.query.path as string[]) || []).join("/"); 
  // console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);
  
  return fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,      
    },
    method: req.method,
    body: req.body,
  });    
  
}

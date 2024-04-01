// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";



const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.OPENAI_API_KEY;
  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }
  
  const openaiPath = ((req.query.path as string[]) || []).join("/"); 
  console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);
  try {
    return fetch(`${baseUrl}/${openaiPath}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,      
      },
      method: req.method,
      body: req.body,
    });    
  } catch (e) {
    console.error("[OpenAI] ", req.body, e);
    return res.status(500).json(    
      {
        error: true,
        msg: JSON.stringify(e),
      }
    );
  }
}

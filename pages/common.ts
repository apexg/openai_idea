
const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

import type { NextApiRequest } from "next";
export default async  function requestOpenai(req: NextApiRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
//   const openaiPath = req.headers.get("path");

  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }
  
  const openaiPath = ((req.query.path as string[]) || []).join("/"); 
  console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);

//   if (process.env.OPENAI_ORG_ID) {
//     console.log("[Org ID]", process.env.OPENAI_ORG_ID);
//   }

  return fetch(`${baseUrl}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,      
    },
    method: req.method,
    body: req.body,
  });
}
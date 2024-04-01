// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { requestOpenai } from "../common";


export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const api = await requestOpenai(req);
    // const res =api.body;
    // res.headers.set("Content-Type", "application/json");
    // res.headers.set("Cache-Control", "no-cache");
    res.status(200).json({ api })
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

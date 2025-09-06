import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // ป้องกัน error จาก body parser
  },
};

export default async function handler(req, res) {
  try {
    const targetUrl = "https://totti911-sun.online" + req.url.replace("/api/proxy", "");

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "totti911-sun.online", // เปลี่ยน host header
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    const data = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy Error: " + err.message);
  }
}

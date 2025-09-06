import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://totti911-sun.online" + req.url.replace("/api/proxy", "");
  const response = await fetch(url);
  const data = await response.text();
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(data);
}

import http from "http";
import fs from "fs";

const PORT = 8080 ?? 8081;
const server = http.createServer((req, res) => {
    console.log(req.url);
  //   res.write("Hola mundo");
  //   res.end();
  // const data = {name: "Daniel", age: 24, city: "CDE" }
  // res.writeHead(200, {"Content-Type" : "application/json"})
  // res.end(JSON.stringify(data))
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javacript" });
  } else if (req.url?.endsWith("css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }
  const contentResponse = fs.readFileSync(`./public${req.url}`, "utf-8");
  res.end(contentResponse);
});

server.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}/`);
});

// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// /posts/list 엔드포인트를 /posts 데이터로 응답하도록 설정
server.get("/posts/list", (req, res) => {
  const posts = router.db.get("posts").value();
  res.json({
    data: posts.map(({ title, user_name, created_at }) => ({ title, user_name, created_at })),
  });
});

server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running on port 8000");
});

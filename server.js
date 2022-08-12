const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectMongoDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// 로그 요청
app.use(morgan("tiny"));

// mongoDB 연결
connectMongoDB();

// body-parser 설명 글 참조
// https://velog.io/@hyunju-song/body-parser%EC%9D%98-urlencoded%EB%8A%94-%EB%8F%84%EB%8C%80%EC%B2%B4-%EC%96%B4%EB%96%A4-%EC%97%AD%ED%95%A0%EC%9D%84-%ED%95%98%EB%8A%94-%EA%B1%B8%EA%B9%8C

// Body-Parser에 대한 요청을 구문 분석합니다.
app.use(bodyparser.urlencoded({ extended: true }));

// view 엔진을 설정하십시오
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

// assets 로드
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// routers 로드
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`서버 작동 중 http://localhost:${PORT}`);
});

const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();

// process.env.port||3000의 뜻은 process.env라른 객체에 port라는 설정이 있다면 
// 그 속성을 사용하고 없다면 3000을 사용한다는 뜻이다.
const port = process.env.PORT || 3000; 

app.use(cors());

//스키마 연결
const connect = require("./schemas/comment"); 
//db 연결
connect(); 

//Request 로그 남기는 미들웨어
const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

app.use(express.json());
app.use(requestMiddleware);

//router 가져오기
const commentRouter = require("./routes/comment"); 
// const userRouter = require("./routes/user"); 

//바디로 들어온 제이슨 형태를 파싱
//Router 미들웨어 사용
app.use('/api', express.urlencoded({ extended: false }), [ 
  //userRouter, 
  commentRouter, ]);

app.listen(port, () => {
  console.log(port, ': 포트로 서버가 열렸어요!');
});
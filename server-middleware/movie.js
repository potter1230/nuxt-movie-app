const express = require("express");
const axios = require('axios');

const app = express();
const { OMDB_API_KEY } = process.env;

// express.json() 플러그인 추가, http 통신을 위한 코드
app.use(express.json());
app.post("/", async (req, res) => {
  const payload = req.body;
  const { title, type, year, page, id } = payload;

  console.log('OMDB_API_KEY: ', OMDB_API_KEY);
  console.log('params: ', payload);

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      res.status(400)
        .json(data.Error);
    }
    res.status(200)
      .json(data);
  } catch (error) {
    res.status(error.response.status)
      .json(error.message);
  }
});

// 위의 작성된 로직을 내보내 활용할 수 있도록 한다.
module.exports = app;
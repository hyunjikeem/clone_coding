const express = require("express");
const router = express.Router();
const Room = require("../schemas/room");
const Comment = require("../schemas/comment");

//숙소 리스트 조회

router.get("/location/:listId", async (req, res) => {
  try {
    const { listId } = req.params;
    const locationPlaces = await Room.find({listId:Number(listId)});
    res.json({
      locationPlaces,
    });
  } catch (err) {
    res.status(400).send({
      ok: false,
      errorMessage: "올바르지 않은 요청입니다. 😢",
    });
  }
});

// 숙소 상세 페이지 조회
router.get("/detail/:placeId", async (req, res) => {
  try {
    const { placeId } = req.params;
    const place = await Room.findOne(Number(placeId));
    const comment = await Comment.find(Number(listId));
    res.json({
      place,
      comment,
    });

  } catch (err) {
    res.status(400).send({
      ok: false,
      errorMessage: "올바르지 않은 요청입니다. 😢",
    });
  }
});

module.exports = router;

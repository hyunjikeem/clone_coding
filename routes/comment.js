const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");




//댓글 등록
router.post("/detail/comments/:placeId", authMiddleware, async (req, res) => {
  const { commentContent } = req.body;
  const { placeId } = req.params;
  const userNickname = res.locals.user.userNickname;
  
  try {
    if (!commentContent) {
      res.status(200).send({
        ok: false,
        errorMessage: "내용을 입력해 주세요 😥",
      });
      return;
    }

    Comment.create({
      placeId,
      userNickname,
      commentContent,
    });

    res.status(201).send({
      ok: true,
      Message: "후기가 등록되었습니다 😃",
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      ok: false,
      errorMessage: "올바르지 않은 형식입니다.",
    });
  }
});

//댓글 수정
router.put("/detail/comments/:commentId", authMiddleware, async (req, res) => {
  const { commentContent } = req.body;
  const { commentId } = req.params;
  const userNickname = res.locals.user.userNickname;

  const existComment = await Comment.findOne({ commentId: Number(commentId) });

  if (existComment.userNickname === userNickname) {
    await Comment.updateOne(
      { commentId: Number(commentId) },
      { $set: { commentContent } }
    );
    res.json({
      ok: true,
      message: "댓글 수정이 완료되었습니다. 😃",
    });
  } else {
    res.json({
      ok: false,
      errorMessage: "댓글을 수정할 수 없습니다 😥",
    });
  }
});

//댓글 삭제
router.delete("/detail/comments/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const userNickname = res.locals.user.userNickname;
  
  const existComment = await Comment.findOne({ commentId: Number(commentId) });

  if (existComment.userNickname === userNickname) {
    await Comment.deleteOne(
      { commentId: Number(commentId) },
    );
    res.json({
      ok: true,
      message: "댓글 삭제가 완료되었습니다. 😃",
    });
  } else {
    res.json({
      ok: false,
      errorMessage: "다른 사람의 댓글을 삭제할 수 없습니다 😥",
    });
  }
});

module.exports = router;

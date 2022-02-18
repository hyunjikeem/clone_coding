const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");

//댓글 작성
router.post("/detail/comments", authMiddleware, async (req, res) => {
  const commentContent = req.body;
  const placeId = req.params;
  const commentNickname = res.locals.users.userNickname;
  //const userId = res.locals.users.userId

  try {
    if (!commentContent) {
      res.status(200).send({
        ok: false,
        errorMessage: "내용을 입력해 주세요 😥",
      });
      return;
    }

    Comment.create({
      //userId,
      placeId,
      commentNickname,
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
    const commentContent = req.body;
    const commentId = req.params;
    const userNickname = res.locals.userNickname;

    const [findComment] = await commentContent.find({ commentId: commentId});
    const commentUsernickname = findComment.userNickname;

    if (userNickname === commentUsernickname) {
        await Comment.updateone(
            { commentId: commentId},
            {$set: { commentContent }}
        );
        res.json({
            ok:true,
            message:"댓글 수정이 완료되었습니다. 😃"
        });
    } else {
        res.json({
            ok:false,
            errorMessage: "댓글을 수정할 수 없습니다 😥"
        })
    }
})
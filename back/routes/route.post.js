const express = require("express");
const router = express.Router();

const {createPost, getPost, updatePost,addComent,getUserByID, deletePost,deleteComment, getAllPostsByUserId,getAllComents,likePost, getTimelinePosts,getAllPost} = require('../controller/controller.post')

router.post("/" , createPost)
router.get("/:id" , getPost)
router.put("/:id" , updatePost)
router.delete("/:id" , deletePost)
router.put("/:id/like" , likePost)
router.get("/:id/timeline" , getTimelinePosts)
router.get('/', getAllPost);
router.post('/:id/comment', addComent);
router.delete('/:id/comment/:commentId', deleteComment);
router.get('/user/:id', getUserByID);

router.get('/:id/comments', getAllComents);
router.get("/user/:id/allposts", getAllPostsByUserId)
module.exports = router;

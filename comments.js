// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.js');
const Post = require('../models/post.js');
const { ensureAuthenticated } = require('../config/auth.js');

// Create comment
router.post('/createComment', ensureAuthenticated, (req, res) => {
    // Create comment
    const comment = new Comment({
        comment: req.body.comment,
        user: req.user._id,
        post: req.body.post
    });
    // Save comment
    comment.save((err) => {
        if (err) {
            res.json({ success: false, message: 'Failed to create comment' });
        } else {
            res.json({ success: true, message: 'Comment created' });
        }
    });
});

// Delete comment
router.delete('/deleteComment', ensureAuthenticated, (req, res) => {
    // Delete comment
    Comment.findByIdAndDelete(req.body.id, (err) => {
        if (err) {
            res.json({ success: false, message: 'Failed to delete comment' });
        } else {
            res.json({ success: true, message: 'Comment deleted' });
        }
    });
});

// Edit comment
router.post('/editComment', ensureAuthenticated, (req, res) => {
    // Edit comment
    Comment.findByIdAndUpdate(req.body.id, { $set: { comment: req.body.comment } }, (err) => {
        if (err) {
            res.json({ success: false, message: 'Failed to edit comment' });
        } else {
            res.json({ success: true, message: 'Comment edited' });
        }
    });
});

// Get comments
router.get('/getComments', ensureAuthenticated, (req, res) => {
    // Get comments
    Comment.find({ post: req.query.id }).populate('user').exec((err, comments) => {
        if (err) {
            res.json({ success: false, message: 'Failed to get comments' });
        } else {
            res.json({ success: true, message: 'Comments retrieved', comments: comments });
        }
    });
});

// Get comment
router.get('/getComment', ensureAuthenticated, (req, res) => {
    // Get comment
    Comment.findById(req.query.id, (err, comment) => {
        if (err) {
            res.json({ success: false, message: 'Failed to get comment' });
        } else {
            res.json({ success: true, message: 'Comment retrieved', comment: comment });
        }
    });
});

module.exports = router;

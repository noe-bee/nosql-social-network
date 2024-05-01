const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thoughtController');

  // all routes using --> /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// all routes using --> /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// all routes using --> /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// all routes using --> /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;
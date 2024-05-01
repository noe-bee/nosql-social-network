const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
  } = require('../../controllers/thoughtController');

  // all routes using --> /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// all routes using --> /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought)
// .delete(deleteThought).put(updateThought);

module.exports = router;
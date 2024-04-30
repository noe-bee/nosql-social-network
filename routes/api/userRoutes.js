const router = require("express").Router();
// const { User, Thought } = require('../../models');

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

// all routes using --> /api/users
router.route('/').get(getUsers).post(createUser);

// all routes using --> /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// all routes using --> /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// all routes using --> /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;

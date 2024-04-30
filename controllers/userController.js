// const router = require("express").Router();
const { User, Thought } = require('../models');

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "internal service error"});
    };
  },

  async getSingleUser(req, res) {
    try {
      //GET a SINGLE user by ID
        const user = await User.findOne({ _id: req.params.userId });

        if(!user){
            return res.status(404).json({ message: 'No user with that ID'})
        }

        res.json(user)

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "internal service error"})
    }
  },
  async createUser(req, res) {
    // CREATE a new user
    try {
        const user = await User.create(req.body);
        res.json(user);
    }catch (err) {
        res.status(500).json({error: "internal service error"})
    }
  },
  async updateUser(req, res) {
    // UPDATE a user
    try{
    const user = await User.findOneAndUpdate(
      {_id: req.params.userId}, 
      { $set: req.body },
      { new: true });

    if (!user) {
      return res.status(400).json({ message: 'No user with this id!' });
    }

    res.json(user);
  }catch(err) {
    res.status(500).json({ message: 'internal service error'})
  }
},
  async deleteUser(req, res) {
    // DELETE a user
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(400).json( { message: 'No user with this ID!' })
      }
      res.json({ message: 'User successfully deleted'})

    }catch(err) {
      console.log(err)
      res.status(500).json({ message: "internal service error" })
    }
  },
  async addFriend(req, res) {
    // ADD a friend to a user by their friendId
    console.log('You are adding a friend');
    console.log(req.body);

    try{
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId } },
        { new: true }
      );

      if(!user){
        return res.status(404).json({ message: 'No user found with this ID'});
      }

      res.json(user);
    }catch(err){
      res.status(500).json({ message: 'internal service error'})
    }
  },
  async deleteFriend(req, res) {
    // DELETE a friend from a user's friends array
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: {friends: { friendId: req.params.friendId } } },
        {new: true}
      );

      if(!user) {
        return res.status.json({ message: 'No user found witht that ID'})
      }
      res.json(user);
    }catch(err){
      res.status(500).json({ message: 'internal service error'})
    }
  }
};

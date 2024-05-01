const { User, Thought } = require('../models');
const reactionSchema = require("../models/Reaction");

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "internal service error" });
    }
  },
  async getSingleThought(req, res) {
    // GET a SINGLE thought by Id
    try {
      const thought = await Thought.findById({
        _id: req.params.thoughtId,
      }).populate("username");

      if (!thought) {
        return res.status(400).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: "internal service error" });
    }
  },
  async createThought(req, res) {
    // CREATE a new thought and associate it with a user
    try {
      const { thoughtText, username, userId } = req.body;

      const newThought = new Thought({
        thoughtText,
        username,
        userId,
      });

      // save the document(newThought) 
    await newThought.save();

    // find the user and push the new thought into their thoughts array
    const user = await User.findById(userId);
    user.thoughts.push(newThought._id);

    //save the document (user) to make sure everything associated with the user is updated
    await user.save();

        if (!user) {
        return res.status(400).json({ message: "No user found with this ID" });
        }

    res.status(201).json(newThought);

    } catch (err) {
      res.status(500).json({ error: "internal service error" });
    }
  },
  async updateThought(req, res) {
    // UPDATE a thought by its Id
    try{
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        //set to update Thought's specific field of thoughtText only
        { $set: { thoughtText: req.body.thoughtText } },
        {runValidators: true, new: true}
      );

      if(!thought) {
        return res.status(400).json({ message: 'No thought with this Id!'})
      }

      res.json(thought);
    }catch(err){
      res.status(500).json({ error: 'internal service error' })
    }
  },
  async deleteThought(req, res) {
    // DELETE a thought by its Id
    try{
      const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})

      if(!thought) {
        return res.status(400).json({ message: 'No thought with this Id!'})
      }
      res.json({ message: 'Thought successfully deleted'})

    }catch(err){
      res.status(500).json({ error: 'internal service error' })
    }
  },
  async addReaction(req, res) {
    // ADD a reaction to a THOUGHT by with the reaction content
    console.log('You are adding a reaction to a thought');
    console.log(req.body);
    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if(!thought) {
        return res.status(400).json({ message: 'No thought with this Id!'})
      }
      res.json(thought);
    }catch(err){
      res.status(500).json({ error: 'internal service error' })
    }
  },
  async deleteReaction(req, res) {
    //DELETE a reaction by their reactionId
    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        //pulling to remove an element from the reactions array
        { $pull: {reactions: {reactionId: req.params.reactionId } } },
        {runValidators: true, new: true}
      );

      if(!thought) {
        return res.status(400).json({ message: 'No thought with this Id!'})
      }

      res.json(thought);
    }catch(err){
      res.status(500).json({ error: 'internal service error' })
    }
  }
};
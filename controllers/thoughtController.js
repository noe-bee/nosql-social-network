const { User, Thought } = require('../models');

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
  }
};
import User from "../models/user.js";

// ➕ Add friend
export const addFriend = async (req, res) => {
  const myId = req.user.id;
  const { friendId } = req.body;

  if (myId === friendId) {
    return res.status(400).json({ msg: "Cannot add yourself" });
  }

  const me = await User.findById(myId);
  const friend = await User.findById(friendId);

  if (!friend) return res.status(404).json({ msg: "User not found" });

  if (me.friends.includes(friendId)) {
    return res.status(400).json({ msg: "Already friends" });
  }

  // add both sides
  me.friends.push(friendId);
  friend.friends.push(myId);

  await me.save();
  await friend.save();

  res.json({ msg: "Friend added" });
};

// 👇 Get friends list
export const getFriends = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("friends", "-password");

  res.json(user.friends);
};
const users = require("../models/userSchema");
const moment = require("moment");

//create users
exports.userPost = async (req, res) => {
  // console.log(req.body);
  const { firstName, email, mobile, gender, status } = req.body;

  if (!firstName || !email || !mobile || !gender || !status) {
    res.status(400).json({ error: "All Input Is Required" });
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "This user already exist in our db" });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        firstName,
        email,
        mobile,
        gender,
        status,
        dateCreated: dateCreate,
      });

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//Get all users
exports.getAllUsers = async (req, res) => {
  const search = req.query.search || "";
  const status = req.query.status || "";
  const gender = req.query.gender || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = req.query.items || 2;

  const query = {
    firstName: { $regex: search, $options: "i" },
  };

  if (status !== "All") {
    query.status = status;
  }

  if (gender !== "All") {
    query.gender = gender;
  }

  try {
    //skip
    const skip = (page - 1) * ITEM_PER_PAGE;

    const usersData = await users
      .find(query)
      .sort({ dateCreated: sort == "new" ? -1 : 1 })
      .limit(ITEM_PER_PAGE).skip(skip);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//get single user
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const singleUserData = await users.findOne({ _id: id });
    res.status(200).json(singleUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUserData = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//Update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, email, mobile, gender, status } = req.body;

  try {
    const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    const updateUserData = await users.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        email,
        mobile,
        gender,
        status,
        dateUpdated: dateUpdate,
      },
      { new: true }
    );
    await updateUserData.save();
    res.status(200).json(updateUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("Catch Block Error");
  }
};

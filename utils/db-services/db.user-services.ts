import User from "../../models/users";

type userInfo = {
  fname: string;
  lname: string;
  email: string;
  profilePicURL?: string;
};

const addUser = ({ fname, lname, email, profilePicURL }: userInfo) => {
  const user = new User({
    fname,
    lname,
    email,
    profilePicURL,
  });
  return user.save();
};

const getAllUsers = () => {
  return User.find({});
};

const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export default { addUser, getAllUsers, getUserByEmail };

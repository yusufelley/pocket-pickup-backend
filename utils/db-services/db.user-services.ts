const addUser =
  (User) =>
  ({ fname, lname, email, profilePicURL }) => {
    const user = new User({
      fname,
      lname,
      email,
      profilePicURL,
    });
    return user.save();
  };

const getAllUsers = (User) => () => {
  return User.find({});
};

const getUserByEmail =
  (User) =>
  async ({ email }) => {
    return await User.findOne({ email });
  };

export default (User) => {
  return {
    addGoogleUser: addUser(User),
    getUsers: getAllUsers(User),
    getUserByEmail: getUserByEmail(User),
  };
};

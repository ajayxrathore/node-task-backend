import { User } from "../models/user.model.js";

const createUser = async (data) => {
  try {
    const user = await User.create(data);
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await User.find({});

    return users;
  } catch (error) {
    throw error;
  }
};
export { createUser, getUsers };

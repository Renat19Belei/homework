import userService from "./user.service.js";

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

const getUserById = (req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Користувача не знайдено" });
  }
  res.json(user);
};

const createUser = (req, res) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const updatedUser = userService.updateUser(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(404).json({ message: "Користувача не знайдлено" });
  }
  res.json(updatedUser);
};

const deleteUser = (req, res) => {
  const deletedUser = userService.deleteUser(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: "Користувача не знайдлено" });
  }
  res.json({ message: "Користувача видалено" });
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

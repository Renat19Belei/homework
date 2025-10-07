import fs from "fs";

const DATA_FILE = "./users.json";

const readData = () => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const getAllUsers = () => readData();

const getUserById = (id) => {
  const users = readData();
  return users.find((u) => u.id === Number(id));
};

const createUser = (user) => {
  const users = readData();
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  writeData(users);
  return newUser;
};

const updateUser = (id, updatedUser) => {
  const users = readData();
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return null;
  users[index] = { ...users[index], ...updatedUser };
  writeData(users);
  return users[index];
};

const deleteUser = (id) => {
  const users = readData();
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return null;
  const deleted = users.splice(index, 1);
  writeData(users);
  return deleted[0];
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

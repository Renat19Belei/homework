import fs from "fs";

const DATA_FILE = "./users.json";
interface User {
  id: number;
  name: string;
  email: string;
}

const readData = (): User[] => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: User[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export const getAllUsers = (): User[] => readData();

export const getUserById = (id: number): User | undefined => {
  const users = readData();
  return users.find((u) => u.id === id);
};

export const createUser = (userData: any) => {
  const users = readData();
  const newUser = { id: Date.now(), ...userData };
  users.push(newUser);
  writeData(users);
  return newUser;
};


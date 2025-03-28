import bcrypt from "bcryptjs";

const matchPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export default matchPassword;

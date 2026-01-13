import User from "../models/User.js";
import bcrypt from "bcryptjs"; //Hashing

//Register
export async function register(req, res) {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    //Validation
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //Check existing username
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(409).json({ message: "Username already exist" });
    }
    //Check existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      //409 existed data
      return res.status(409).json({ message: "Email already exist" });
    }
    //Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    //Generate JWT

    //Sucess response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
}

//Login
export async function login(req, res) {
  try {
  } catch (error) {}
}

//Logout
export const logout = (req, res) => {};

//Refresh token

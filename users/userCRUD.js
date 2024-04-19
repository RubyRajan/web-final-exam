import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './usersSchema.js';

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      return res.json({ message: 'User deleted' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      username,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Sign up successful' });
  } catch (error) {
    res.status(500).json({ message: 'Sign up failed' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: existingUser });
  } catch (error) {
    res.status(500).json({ message: 'Sign in failed' });
  }
};

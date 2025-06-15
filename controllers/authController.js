import userModel from '../models/userModel.js';
import orderModel from "../models/orderModel.js";

import { hashPassword } from '../helpers/authHelper.js';
import { comparePassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;

    // Validate input
    if (!name || !email || !password || !address || !answer) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({success: false, message: 'User already exists', });
    }


    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,       // optional
      address,     // required in schema
      answer
    });

    // Save user to database
    await user.save();

    res.status(201).json({ success: true,message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords using helper
    const isMatch = await comparePassword(password, user.password); // ✅ Use imported function
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = JWT.sign(
      { _id: user._id ,role:user.role},
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, answer, newPassword } = req.body;

    // Validate input
    if (!email || !answer || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user by email
    const user = await userModel.findOne({ email,answer});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);
    await userModel.findOneAndUpdate(user._id, { password: hashedNewPassword });
    // Update user's password


    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
       message: 'Internal server error',
      error
     });
  }
}


export const testController = (req, res) => {
  res.status(200).json({ message: 'Protected route accessed successfully' });
};


export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Handle password update only if provided
    let hashedPassword = user.password;
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true } // return the updated document
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

import Farmer from "../models/farmer.model.js";
import Bank from "../models/bank.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

// User Registration (Farmer or Banker)
export const registerUser = async (req, res) => {
  try {
    const { role, firstname, lastname, email, password } = req.body;

    if (!role || !["farmer", "banker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const Model = role === "farmer" ? Farmer : Bank;

    const existingUser = await Model.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    const Model = role === "farmer" ? Farmer : Bank;
    const user = await Model.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    console.log("HOLE HOLE")
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, SECRET_KEY, {
      expiresIn: "24h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching farmers", error });
  }
};

// Get farmer by ID
export const getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching farmer", error });
  }
};

// Get all banks
export const getBanks = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banks", error });
  }
};

// Get bank by ID
export const getBankById = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);
    if (!bank) return res.status(404).json({ message: "Bank not found" });

    res.json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank", error });
  }
};

// Check Loan Eligibility
export const checkLoanEligibility = async (req, res) => {
  try {
    const { creditScore, income, farmSize, loanAmountRequested } = req.body;

    if (creditScore < 600 || income < 50000 || farmSize < 2) {
      return res.json({
        eligible: false,
        message: "Loan eligibility criteria not met",
      });
    }

    res.json({ eligible: true, message: "Loan approved" });
  } catch (error) {
    res.status(500).json({ message: "Error checking eligibility", error });
  }
};

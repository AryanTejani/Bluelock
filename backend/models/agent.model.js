import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name should be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Email must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const Agent = mongoose.model("agents", agentSchema);

export default Agent;

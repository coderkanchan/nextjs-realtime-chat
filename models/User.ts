// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//   userId: { type: String, required: true, unique: true },
//   isOnline: { type: Boolean, default: false },
//   lastSeen: { type: Date, default: Date.now }
// }, { timestamps: true });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);




// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true }, // Ye hi userId banega
//   password: { type: String, required: true }, // Simple professional approach
//   isOnline: { type: Boolean, default: false },
// }, { timestamps: true });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);









// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true }, // Naya Field
//   password: { type: String, required: true },
//   isOnline: { type: Boolean, default: false },
// }, { timestamps: true });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);





import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
}, { timestamps: true });

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);


// import mongoose, { Schema } from "mongoose";

// const UserSchema = new Schema(
//   {
//     username: { type: String, required: true, unique: true, trim: true, },
//     email: { type: String, required: true, unique: true, lowercase: true, },
//     password: { type: String, required: true, },
//   },
//   { timestamps: true }
// );

// export const User = mongoose.models.User || mongoose.model("User", UserSchema);



// models/User.ts
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Check karein ki model pehle se exist toh nahi karta
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: {
      type: String,
      default: "/src/assets/img/users/no-user.jpg",
    },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ["admin", "guest"], default: "guest" },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.hashedPassword; // Fjern hashedPassword fra responses
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
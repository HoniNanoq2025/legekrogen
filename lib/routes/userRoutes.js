const express = require("express");
const multer = require("multer");
const { userStorage } = require("../misc/mStorage.js");
const auth = require("../middleware/authMiddleware.js");

const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
} = require("../handlers/userHandler.js");

const userRouter = express.Router();
const upload = multer({ storage: userStorage });

userRouter.post(
  "/user",
  auth(["admin"]),
  upload.single("image"),
  async (req, res) => {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password)
      return res.status(400).json({ message: "Alle felter er påkrævet" });

    let image =
      process.env.SERVER_HOST +
      "../../sites/WWW/legekrogen/src/assets/img/users/no-user.jpg";
    if (req.file)
      image =
        process.env.SERVER_HOST +
        "../../sites/WWW/legekrogen/src/assets/img/users/no-user.jpg" +
        req.file.filename;
    const result = await createUser({ name, email, role, password, image });
    res.status(result.status === "ok" ? 201 : 500).json(result);
  }
);

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(result.status === "ok" ? 200 : 401).json(result);
});

userRouter.get("/users", auth(["admin"]), async (req, res) => {
  const result = await getUsers();
  res.status(result.status === "ok" ? 200 : 500).json(result);
});

userRouter.get("/users/:id", auth(["admin"]), async (req, res) => {
  const result = await getUserById(req.params.id);
  res.status(result.status === "ok" ? 200 : 404).json(result);
});

userRouter.put(
  "/user",
  auth(["admin"]),
  upload.single("image"),
  async (req, res) => {
    const result = await updateUser(req.body);
    res.status(result.status === "ok" ? 200 : 404).json(result);
  }
);

userRouter.delete("/user/:id", auth(["admin"]), async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.status(result.status === "ok" ? 200 : 404).json(result);
});

module.exports = userRouter;

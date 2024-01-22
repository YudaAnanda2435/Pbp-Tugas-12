const express = require("express");
const { body, validationResult } = require("express-validator");
const Joi = require("joi");

const app = express();
const port = 3000;

app.use(express.json());

// Middleware untuk validasi input route menggunakan express-validator
const validateInput = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("panjang username minimal 5 karakter"),
  body("email").isEmail().withMessage("format email tidak valid"),
  // Tambahkan validasi lain sesuai kebutuhan
];

// Middleware untuk validasi input route menggunakan Joi
const validateInputJoi = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    // Tambahkan validasi lain sesuai kebutuhan
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

// contoh route denga validasi menggunakan express-validator
app.post("/user", validateInput, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  //pemerosesan data user
  res.json({ message: "Data user valid!" });
});

//contoh route dengan validasi manggunakan joi
app.post("/user-joi", validateInputJoi, (req, res) => {
    res.json({ message: "Data user valid!" });
});

app.listen(port, () => {
  console.log(`server berjalan di http://localhost:${port}`);
});

const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});


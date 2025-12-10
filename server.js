require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==========================================");
  console.log("🚀 Server Started Successfully");
  console.log(`🔗 Running on: http://localhost:${PORT}`);
  console.log("==========================================");
});

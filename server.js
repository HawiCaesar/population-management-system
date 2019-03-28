const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
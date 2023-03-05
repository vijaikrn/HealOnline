const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

require("dotenv").config();

const dbconfig = require("./config/dbconfig");
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute")

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

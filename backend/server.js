const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const infoRoute = require("./routes/info");


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/info", infoRoute);
app.get("/tournaments", (req, res) => {
    const games = [
      {
        id: 1,
        name: "Valorant",
        platform: "PC",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC3nyfz3FDFQq2tYEqm_5_UYeSVzSAT0ySqw&s",
      },
      {
        id: 2,
        name: "BGMI",
        platform: "mobile",
        image: "https://1.bp.blogspot.com/-pu-EF5lF2uM/YPEZ39k4LII/AAAAAAAAA4A/nuMpjhJbp9MsM2fuY2MYflemWWbkw3u5wCLcBGAsYHQ/s512/BGMI-Logo-PNG%2BDownload.jpg",
      },
    ];
    res.json(games);
  });


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

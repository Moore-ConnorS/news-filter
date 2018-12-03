const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./contollers/controller");

app = express();
app.use(bodyParser.json());

app.get("/api/favorites", controller.readFavorites);
app.post("/api/favorites", controller.addToFavorites);
app.put("/api/favorites/:id", controller.updateFavorite);
app.delete("/api/favorites/:id", controller.deleteFavorite);

const PORT = 4000;
app.listen(PORT, () => console.log(`Ship docked at port ${PORT}`));

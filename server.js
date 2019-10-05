const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api-routes")
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

//middleware that I'm using for this project
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//setting up the routes to use
app.use("/api", apiRoutes);


//database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

app.listen(PORT, function() {
    console.log("App running on PORT: " + PORT);
});
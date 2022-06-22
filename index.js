const express = require('express');
const app = express();
const connectDB = require("./config/db")
const PORT = 5003 || process.env.PORT
const path = require("path");

connectDB();
app.use(express.json())
app.use("/api/stockdata", require("./routes/api/stock"))

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})
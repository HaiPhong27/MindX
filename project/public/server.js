app.use(express.json())
app.use("/api/comments", require("./routes/comments"))

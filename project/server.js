const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const USER_FILE = "./users.json";

function readUsers() {
    return JSON.parse(fs.readFileSync(USER_FILE, "utf8"));
}

function writeUsers(users) {
    fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));
}

/* ĐĂNG KÝ */
app.post("/api/register", (req, res) => {
    const { user, email, pass } = req.body;
    const users = readUsers();

    if (users.find(u => u.user === user)) {
        return res.json({ success: false, message: "Tài khoản đã tồn tại" });
    }

    users.push({ user, email, pass });
    writeUsers(users);

    res.json({ success: true });
});

/* ĐĂNG NHẬP */
app.post("/api/login", (req, res) => {
    const { user, pass } = req.body;
    const users = readUsers();

    const found = users.find(u => u.user === user && u.pass === pass);
    if (!found) {
        return res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
    }

    res.json({ success: true });
});

app.listen(3000, () =>
    console.log("Server chạy tại http://localhost:3000")
);

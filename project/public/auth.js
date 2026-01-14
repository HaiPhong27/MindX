function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

/* ========= REGISTER ========= */
function register() {
    const username = document.getElementById("regUser").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;
    const password2 = document.getElementById("regPass2").value;
    const msg = document.getElementById("regMsg");

    if (!username || !email || !password || !password2) {
        msg.innerText = "Vui lòng nhập đầy đủ thông tin";
        return;
    }

    if (password !== password2) {
        msg.innerText = "Mật khẩu xác nhận không khớp";
        return;
    }

    let users = getUsers();

    if (users.find(u => u.username === username)) {
        msg.innerText = "Tên đăng nhập đã tồn tại";
        return;
    }

    users.push({
        username,
        email,
        password
    });

    saveUsers(users);
    msg.style.color = "lime";
    msg.innerText = "Đăng ký thành công!";

    setTimeout(() => {
        location.href = "login.html";
    }, 1000);
}

/* ========= LOGIN ========= */
function login() {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;
    const msg = document.getElementById("loginMsg");

    let users = getUsers();

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        msg.innerText = "Sai tài khoản hoặc mật khẩu";
        msg.style.color = "red";
        return;
    }

    // lưu trạng thái đăng nhập
    localStorage.setItem("currentUser", username);

    msg.style.color = "lime";
    msg.innerText = "Đăng nhập thành công!";

    // 👉 CHUYỂN TRANG CHỦ
    setTimeout(() => {
        location.href = "trangchu.html";
    }, 500);
}

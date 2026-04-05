// ✅ SIGNUP WITH ROLE
function signup() {
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");
  const roleEl = document.getElementById("role");

  if (!emailEl || !passEl || !roleEl) return;

  const email = emailEl.value;
  const password = passEl.value;
  const role = roleEl.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("User already exists!");
    return;
  }

  users.push({ email, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  window.location.href = "index.html";
}

// ✅ LOGIN WITH ROLE REDIRECT
function login() {
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");

  if (!emailEl || !passEl) return;

  const email = emailEl.value;
  const password = passEl.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    // fallback role (important for old users)
    if (!user.role) user.role = "user";

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }
  } else {
    alert("Invalid credentials!");
  }
}

// ✅ PROTECT PAGES + ROLE HANDLING
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const path = window.location.pathname;

  // Allow login & signup pages
  if (path.includes("index.html") || path.includes("signup.html")) {
    return;
  }

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // fallback role
  if (!user.role) user.role = "user";

  // ✅ USER PAGE
  if (path.includes("user.html")) {
    if (user.role !== "user") {
      window.location.href = "admin.html";
      return;
    }

    const emailEl = document.getElementById("userEmail");
    if (emailEl) {
      emailEl.innerText = "Welcome: " + user.email;
    }
  }

  // ✅ ADMIN PAGE
  if (path.includes("admin.html")) {
    if (user.role !== "admin") {
      window.location.href = "user.html";
      return;
    }

    const list = document.getElementById("userList");

    // prevent crash if element missing
    if (!list) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // fix old users without role
    users = users.map(u => ({
      ...u,
      role: u.role || "user"
    }));

    localStorage.setItem("users", JSON.stringify(users));

    list.innerHTML = "";

    users.forEach(u => {
      const li = document.createElement("li");
      li.innerText = `${u.email} (${u.role})`;
      list.appendChild(li);
    });
  }
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ✅ RUN AFTER PAGE LOAD (IMPORTANT)
window.onload = function () {
  checkAuth();
};
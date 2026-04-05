// ✅ SIGNUP
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    alert("User already exists!");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  window.location.href = "index.html";
}

// ✅ LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    user => user.email === email && user.password === password
  );

  if (validUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}

// ✅ PROTECT DASHBOARD
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user && window.location.pathname.includes("dashboard.html")) {
    window.location.href = "index.html";
  }

  if (user && document.getElementById("userEmail")) {
    document.getElementById("userEmail").innerText =
      "Welcome: " + user.email;
  }
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// run auth check
checkAuth();
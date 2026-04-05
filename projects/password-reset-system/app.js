// ✅ VERIFY EMAIL
function verifyEmail() {
  const email = document.getElementById("email").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email);

  if (user) {
    localStorage.setItem("resetUser", email);
    alert("Email verified!");
    window.location.href = "reset.html";
  } else {
    alert("User not found!");
  }
}

// ✅ RESET PASSWORD
function resetPassword() {
  const newPassword = document.getElementById("newPassword").value;
  const email = localStorage.getItem("resetUser");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users = users.map(user => {
    if (user.email === email) {
      return { ...user, password: newPassword };
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("resetUser");

  alert("Password updated successfully!");
  window.location.href = "index.html";
}
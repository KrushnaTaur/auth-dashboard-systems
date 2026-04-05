// ✅ AUTH CHECK (SAFE)
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const path = window.location.pathname;

  // allow login page
  if (path.includes("index.html") || path === "/") return user;

  if (!user) {
    window.location.href = "index.html";
    return null;
  }

  return user;
}

const currentUser = checkAuth();

// ✅ GET TIME
function getTime() {
  return new Date().toLocaleString();
}

// ✅ ADD ACTIVITY
function addActivity(action) {
  if (!currentUser) return;

  let activity = JSON.parse(localStorage.getItem("activity")) || {};

  if (!activity[currentUser.email]) {
    activity[currentUser.email] = [];
  }

  activity[currentUser.email].push({
    action,
    time: getTime()
  });

  localStorage.setItem("activity", JSON.stringify(activity));

  loadActivity();
}

// ✅ LOAD ACTIVITY
function loadActivity() {
  if (!currentUser) return;

  const list = document.getElementById("activityList");
  if (!list) return; // 🔥 prevent crash

  let activity = JSON.parse(localStorage.getItem("activity")) || {};
  const userActivity = activity[currentUser.email] || [];

  list.innerHTML = "";

  userActivity.forEach(act => {
    const li = document.createElement("li");
    li.innerText = `${act.action} - ${act.time}`;
    list.appendChild(li);
  });
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ✅ RUN AFTER PAGE LOAD
window.onload = function () {
  if (currentUser) {
    loadActivity();
  }
};
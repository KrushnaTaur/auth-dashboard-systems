// ✅ AUTH CHECK (SAFE)
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const path = window.location.pathname;

  if (path.includes("index.html") || path === "/") return user;

  if (!user) {
    window.location.href = "index.html";
    return null;
  }

  return user;
}

const currentUser = checkAuth();

// ✅ LOAD TASKS
function loadTasks() {
  if (!currentUser) return;

  const list = document.getElementById("taskList");
  const filterEl = document.getElementById("filter");

  if (!list || !filterEl) return; // 🔥 prevent crash

  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  const userTasks = tasks[currentUser.email] || [];

  const filter = filterEl.value;

  list.innerHTML = "";

  userTasks.forEach((task, index) => {
    if (
      (filter === "completed" && !task.completed) ||
      (filter === "pending" && task.completed)
    ) return;

    const li = document.createElement("li");

    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <b>[${task.priority}]</b> ${task.text} <br>
      <button onclick="toggleTask(${index})">✔️</button>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

// ✅ ADD TASK
function addTask() {
  if (!currentUser) return;

  const textEl = document.getElementById("taskInput");
  const priorityEl = document.getElementById("priority");

  if (!textEl || !priorityEl) return;

  const text = textEl.value;
  const priority = priorityEl.value;

  if (!text) return alert("Enter task!");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

  if (!tasks[currentUser.email]) {
    tasks[currentUser.email] = [];
  }

  tasks[currentUser.email].push({
    text,
    completed: false,
    priority
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  textEl.value = "";
  loadTasks();
}

// ✅ TOGGLE COMPLETE
function toggleTask(index) {
  if (!currentUser) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

  if (!tasks[currentUser.email]) return;

  tasks[currentUser.email][index].completed =
    !tasks[currentUser.email][index].completed;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// ✅ DELETE TASK
function deleteTask(index) {
  if (!currentUser) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

  if (!tasks[currentUser.email]) return;

  tasks[currentUser.email].splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ✅ RUN AFTER PAGE LOAD
window.onload = function () {
  if (currentUser) {
    loadTasks();
  }
};
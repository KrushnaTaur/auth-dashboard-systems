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

// ✅ LOAD FILES
function loadFiles() {
  if (!currentUser) return;

  const container = document.getElementById("fileList");
  if (!container) return; // 🔥 prevent crash

  let files = JSON.parse(localStorage.getItem("files")) || {};
  const userFiles = files[currentUser.email] || [];

  container.innerHTML = "";

  userFiles.forEach((file, index) => {
    const div = document.createElement("div");
    div.className = "file";

    div.innerHTML = `
      <p>${file.name}</p>
      <img src="${file.data}" width="100"><br>
      <button onclick="deleteFile(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

// ✅ UPLOAD FILE
function uploadFile() {
  if (!currentUser) return;

  const input = document.getElementById("fileInput");
  if (!input) return;

  const file = input.files[0];

  if (!file) return alert("Select a file!");

  // ⚠️ LIMIT FILE SIZE (VERY IMPORTANT)
  if (file.size > 1000000) { // 1MB
    alert("File too large! Max 1MB allowed.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    let files = JSON.parse(localStorage.getItem("files")) || {};

    if (!files[currentUser.email]) {
      files[currentUser.email] = [];
    }

    files[currentUser.email].push({
      name: file.name,
      data: reader.result
    });

    localStorage.setItem("files", JSON.stringify(files));

    loadFiles();
  };

  reader.readAsDataURL(file);
}

// ✅ DELETE FILE
function deleteFile(index) {
  if (!currentUser) return;

  let files = JSON.parse(localStorage.getItem("files")) || {};

  if (!files[currentUser.email]) return;

  files[currentUser.email].splice(index, 1);

  localStorage.setItem("files", JSON.stringify(files));

  loadFiles();
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ✅ RUN AFTER PAGE LOAD
window.onload = function () {
  if (currentUser) {
    loadFiles();
  }
};
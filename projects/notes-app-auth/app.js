// ✅ CHECK AUTH (SAFE VERSION)
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

// ✅ LOAD NOTES
function loadNotes() {
  if (!currentUser) return;

  const list = document.getElementById("notesList");
  if (!list) return; // 🔥 prevent crash

  let notes = JSON.parse(localStorage.getItem("notes")) || {};
  const userNotes = notes[currentUser.email] || [];

  list.innerHTML = "";

  userNotes.forEach((note, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${note}
      <br>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

// ✅ ADD NOTE
function addNote() {
  if (!currentUser) return;

  const inputEl = document.getElementById("noteInput");
  if (!inputEl) return;

  const input = inputEl.value;

  if (!input) {
    alert("Write something!");
    return;
  }

  let notes = JSON.parse(localStorage.getItem("notes")) || {};

  if (!notes[currentUser.email]) {
    notes[currentUser.email] = [];
  }

  notes[currentUser.email].push(input);

  localStorage.setItem("notes", JSON.stringify(notes));

  inputEl.value = "";
  loadNotes();
}

// ✅ DELETE NOTE
function deleteNote(index) {
  if (!currentUser) return;

  let notes = JSON.parse(localStorage.getItem("notes")) || {};

  if (!notes[currentUser.email]) return;

  notes[currentUser.email].splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notes));

  loadNotes();
}

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ✅ RUN AFTER PAGE LOAD (IMPORTANT)
window.onload = function () {
  if (currentUser) {
    loadNotes();
  }
};
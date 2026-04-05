// ✅ LOAD PROFILE
window.onload = function () {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile) {
    document.getElementById("name").value = profile.name;
    document.getElementById("email").value = profile.email;
    document.getElementById("bio").value = profile.bio;
    document.getElementById("profileImg").src = profile.image;
  }
};

// ✅ SAVE PROFILE
function saveProfile() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  const image = document.getElementById("profileImg").src;

  const profile = { name, email, bio, image };

  localStorage.setItem("profile", JSON.stringify(profile));

  alert("Profile saved!");
}

// ✅ IMAGE UPLOAD
document.getElementById("imageInput").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    document.getElementById("profileImg").src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
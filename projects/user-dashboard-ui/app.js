// 🔥 CHART
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Users Growth',
      data: [30, 50, 80, 120],
      borderWidth: 1
    }]
  },
});

// 🔥 ACTIVITY DATA
const activities = [
  "User John signed up",
  "New order received",
  "Server restarted",
  "Admin updated settings"
];

const list = document.getElementById("activityList");

activities.forEach(act => {
  const li = document.createElement("li");
  li.innerText = act;
  list.appendChild(li);
});

// 🔥 FAKE LOGOUT (for UI)
function logout() {
  alert("Logged out!");
}
const projects = [

{
name:"Login / Signup System",
description:"Authentication UI with login and registration flow.",
icon:"🔐",
live:"./projects/login-signup-system/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/login-signup-system"
},

{
name:"User Dashboard UI",
description:"Modern dashboard interface for logged-in users.",
icon:"📊",
live:"./projects/user-dashboard-ui/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/user-dashboard-ui"
},

{
name:"Profile Manager",
description:"User profile management interface with edit features.",
icon:"👤",
live:"./projects/profile-manager/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/profile-manager"
},

{
name:"Password Reset System",
description:"Forgot password and reset flow UI.",
icon:"🔑",
live:"./projects/password-reset-system/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/password-reset-system"
},

{
name:"Admin Panel",
description:"Admin dashboard for managing users and data.",
icon:"🛠️",
live:"./projects/admin-panel/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/admin-panel"
},

{
name:"Role-based Access System",
description:"UI demonstrating admin and user role-based views.",
icon:"🛡️",
live:"./projects/role-based-access-system/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/role-based-access-system"
},

{
name:"Notes App with Auth",
description:"Notes management system with login-based access.",
icon:"📝",
live:"./projects/notes-app-auth/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/notes-app-auth"
},

{
name:"Task Manager",
description:"CRUD-based task management system with authentication.",
icon:"✅",
live:"./projects/task-manager/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/task-manager"
},

{
name:"File Upload System",
description:"File upload interface with user authentication.",
icon:"📁",
live:"./projects/file-upload-system/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/file-upload-system"
},

{
name:"Activity Tracker",
description:"Track user activity and actions in dashboard UI.",
icon:"📈",
live:"./projects/activity-tracker/index.html",
code:"https://github.com/KrushnaTaur/auth-dashboard-systems/tree/main/projects/activity-tracker"
}

];

const grid=document.getElementById("projectsGrid");
const count=document.getElementById("projectCount");

projects.forEach(p=>{
const card=document.createElement("div");

card.className="project-card";

card.innerHTML=`
<div class="project-icon">${p.icon}</div>
<h3>${p.name}</h3>
<p>${p.description}</p>

<div class="buttons">
<a class="btn open" href="${p.live}">Open</a>
<a class="btn code" target="_blank" href="${p.code}">Code</a>
</div>
`;

grid.appendChild(card);
});

count.textContent=projects.length;
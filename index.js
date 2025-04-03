// Load stored data when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadProjects();
    loadBlogs();
});

// Save Profile Info
function saveProfile() {
    const name = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;

    localStorage.setItem("devName", name);
    localStorage.setItem("devBio", bio);

    loadProfile();
}

// Load Profile Data
function loadProfile() {
    const savedName = localStorage.getItem("devName") || "";
    const savedBio = localStorage.getItem("devBio") || "";

    document.getElementById("displayName").textContent = savedName;
    document.getElementById("displayBio").textContent = savedBio;
}

// Add a new Project
function addProject() {
    const projectName = document.getElementById("projectName").value;
    const projectLink = document.getElementById("projectLink").value;

    if (projectName && projectLink) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push({ name: projectName, link: projectLink });

        localStorage.setItem("projects", JSON.stringify(projects));

        loadProjects();
    }
}

// Load and display Projects
function loadProjects() {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach((project, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${project.link}" target="_blank">${project.name}</a> 
                        <button onclick="deleteProject(${index})">❌</button>`;
        projectList.appendChild(li);
    });
}

// Delete a Project
function deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
}

// Add a Blog Post
function addBlog() {
    const blogTitle = document.getElementById("blogTitle").value;
    const blogContent = document.getElementById("blogContent").value;

    if (blogTitle && blogContent) {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push({ title: blogTitle, content: blogContent });

        localStorage.setItem("blogs", JSON.stringify(blogs));

        loadBlogs();
    }
}

// Load and display Blog Posts
function loadBlogs() {
    const blogPosts = document.getElementById("blogPosts");
    blogPosts.innerHTML = "";

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach((blog, index) => {
        const div = document.createElement("div");
        div.classList.add("blog-post");
        div.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p>
                         <button onclick="deleteBlog(${index})">❌</button>`;
        blogPosts.appendChild(div);
    });
}

// Delete a Blog Post
function deleteBlog(index) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

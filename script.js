// Fetch function to get data from the server
async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        return await response.json(); // Assuming the API returns JSON
    } catch (error) {
        console.error(error);
    }
}

// Function to handle fetching tasks
async function getTasks() {
    const tasks = await fetchData("tasks");
    console.log("Tasks fetched:", tasks);
    // Example of dynamically rendering tasks
    const taskContainer = document.querySelector(".task-info ul");
    taskContainer.innerHTML = ""; // Clear previous content
    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.name; // Assuming the task object has a 'name' property
        taskContainer.appendChild(taskItem);
    });
}

// Function to handle navigation buttons
function navigateTo(section) {
    console.log(`Navigating to ${section}`);
    // Example: Hide all sections and show only the selected one
    const allSections = document.querySelectorAll(".content-section");
    allSections.forEach((sectionEl) => sectionEl.classList.add("hidden"));

    const targetSection = document.querySelector(`#${section}`);
    if (targetSection) {
        targetSection.classList.remove("hidden");
    }
}

// Button event listeners
function initializeButtons() {
    // Task Button
    const taskButton = document.querySelector("#viewTasks");
    taskButton.addEventListener("click", () => {
        getTasks();
        navigateTo("tasksSection");
    });

    // Dashboard Button
    const dashboardButton = document.querySelector("#viewDashboard");
    dashboardButton.addEventListener("click", () => {
        navigateTo("dashboardSection");
    });

    // Logout Button
    const logoutButton = document.querySelector(".logoutbtn");
    logoutButton.addEventListener("click", () => {
        console.log("Logging out...");
        // Redirect to login page or clear session
        window.location.href = "/login";
    });
}

// Main Function
async function main() {
    console.log("Initializing app...");
    initializeButtons();
    await getTasks(); // Fetch initial tasks on load
}

// Run main function
main();

document.getElementById('vid_elem1').loop = true;


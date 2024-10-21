// Initialize todo list from local storage or empty array
let todo = JSON.parse(localStorage.getItem("todo") || "[]");

// Get references to DOM elements
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deletebutton");

// Event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Add button click event
    addButton.addEventListener("click", addTask);

    // Enter key press event for adding a task
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    // Delete button click event
    deleteButton.addEventListener("click", deleteAllTasks);

    // Display tasks on page load
    displayTasks();
});

// Function to add a new task
function addTask() {
    const newTask = todoInput.value.trim(); // Corrected from ariaValueMax to value
    if (newTask !== "") {
        todo.push({ text: newTask, disabled: false });
        saveToLocalStorage();
        todoInput.value = ""; // Clear the input after adding task
        displayTasks();
    }
}

// Function to display tasks
function displayTasks() {
    todoList.innerHTML = ""; // Clear the todo list before displaying

    todo.forEach((item, index) => {
        const p = document.createElement("div");
        p.innerHTML = `
            <div class="todo-item">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;

        // Add the checkbox change event listener
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });

        todoList.appendChild(p); // Append each task to the list
    });

    todoCount.textContent = todo.length; // Update task count
}

// Function to edit a task
function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;

    // Replace the text with an input field for editing
    const input = document.createElement("input");
    input.value = existingText;
    todoItem.innerHTML = "";
    todoItem.appendChild(input);

    // On blur (focus out), save the updated task
    input.addEventListener("blur", function () {
        const updatedText = input.value.trim();
        if (updatedText !== "") {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });

    // Focus the input field for better UX
    input.focus();
}

// Function to toggle the task's completion status
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled; // Toggle completed state
    saveToLocalStorage();
    displayTasks();
}

// Function to save the todo list to local storage
function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

// Function to delete all tasks
function deleteAllTasks() {
    todo = []; // Clear the todo array
    saveToLocalStorage();
    displayTasks();
}

const taskNameInput = document.querySelector(".task-name-input");
const taskDescInput = document.querySelector(".task-desc-input");
const list = document.querySelector(".list");
const addButton = document.createElement("button");

addButton.textContent = "Add Task";
addButton.classList.add("add-btn");
// document.body.insertBefore(addButton, list);
taskDescInput.insertAdjacentElement("afterend", addButton);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ name, description }) =>
    createTaskElement(name, description)
  );
}

// Function to save tasks to local storage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove tasks from local storage
function removeTaskFromLocalStorage(taskToRemove) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter(
    (task) =>
      task.name !== taskToRemove.name ||
      task.description !== taskToRemove.description
  );
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

function createTaskElement(name, description) {
  const taskItem = document.createElement("li");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  taskContent.innerHTML = `<strong>${name}</strong>`;

  const hr = document.createElement("hr");
  taskContent.appendChild(hr);

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = description;
  taskContent.appendChild(descriptionParagraph);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteButton);
  list.prepend(taskItem);

  deleteButton.addEventListener("click", () => {
    list.removeChild(taskItem);
    removeTaskFromLocalStorage({ name, description });
  });
}

// Add Task button
addButton.addEventListener("click", () => {
  const taskName = taskNameInput.value.trim();
  const taskDesc = taskDescInput.value.trim();

  if (taskName && taskDesc) {
    createTaskElement(taskName, taskDesc);
    saveTaskToLocalStorage({ name: taskName, description: taskDesc });
    taskNameInput.value = "";
    taskDescInput.value = "";
  } else {
    alert("Please enter both task name and description.");
  }
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

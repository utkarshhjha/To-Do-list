document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(newTaskInput.value);
        newTaskInput.value = "";
    });

    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            deleteTask(e.target.closest("li"));
        } else if (e.target.classList.contains("edit")) {
            editTask(e.target.closest("li"));
        } else if (e.target.classList.contains("completed-checkbox")) {
            toggleComplete(e.target.closest("li"));
        }
    });

    loadTasks();

    function addTask(task) {
        if (task) {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="completed-checkbox">
                <span>${task}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            taskList.appendChild(li);
            saveTasks();
        }
    }

    function deleteTask(task) {
        task.remove();
        saveTasks();
    }

    function editTask(task) {
        const newTask = prompt("Edit task", task.querySelector("span").textContent);
        if (newTask !== null) {
            task.querySelector("span").textContent = newTask;
            saveTasks();
        }
    }

    function toggleComplete(task) {
        task.classList.toggle("completed");
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(task => {
            tasks.push({
                text: task.querySelector("span").textContent,
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="completed-checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            if (task.completed) {
                li.classList.add("completed");
            }
            taskList.appendChild(li);
        });
    }
});

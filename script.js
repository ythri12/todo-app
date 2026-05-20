const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks(tasks);

addBtn.addEventListener("click", addTask);

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks(tasks);

    taskInput.value = "";
}

function displayTasks(taskArray){

    taskList.innerHTML = "";

    taskArray.forEach(task => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="task-buttons">

                <button onclick="toggleTask(${task.id})">
                    ✔
                </button>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    displayTasks(tasks);
}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks(tasks);
}

function editTask(id){

    const newText = prompt("Edit task:");

    if(newText){

        tasks = tasks.map(task => {

            if(task.id === id){
                task.text = newText;
            }

            return task;
        });

        saveTasks();

        displayTasks(tasks);
    }
}

function filterTasks(type){

    if(type === "all"){
        displayTasks(tasks);
    }

    else if(type === "active"){

        const activeTasks = tasks.filter(task => !task.completed);

        displayTasks(activeTasks);
    }

    else if(type === "completed"){

        const completedTasks = tasks.filter(task => task.completed);

        displayTasks(completedTasks);
    }
}

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
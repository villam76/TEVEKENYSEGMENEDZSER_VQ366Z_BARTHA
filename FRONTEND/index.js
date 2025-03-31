const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("newtask");
const durationInput = document.getElementById("newtaskduration");
const taskList = document.getElementById("taskList");


addButton.addEventListener("click", function () {

    const taskName = taskInput.value.trim();
    const taskDuration = parseInt(durationInput.value.trim(), 10);

    if (!taskName || isNaN(taskDuration)) {
        alert("Kérlek add meg a feladat nevét és időtartamát!");
        return;
    }
    
    if (taskDuration < 1 || taskDuration > 8) {
        alert("A feladat időtartama 1 és 8 óra között kell legyen!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex");
    li.innerHTML = `<span>${taskName} - ${taskDuration} óra</span>`;
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "ms-auto");
    deleteButton.innerText = "Törlés";
    deleteButton.addEventListener("click", function () {
        li.remove();
    });
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
    durationInput.value = "";
});
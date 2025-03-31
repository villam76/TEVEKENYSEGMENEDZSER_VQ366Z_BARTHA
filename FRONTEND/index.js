const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("newtask");
const durationInput = document.getElementById("newtaskduration");
const taskList = document.getElementById("taskList");


addButton.addEventListener("click", function () {

    const taskName = taskInput.value.trim();
    const taskDuration = durationInput.value.trim();

    if (taskName && taskDuration) {
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
    } else {
        alert("Kérlek töltsd ki a feladat nevét és időtartamát!");
    }
});
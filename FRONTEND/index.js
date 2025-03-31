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
        taskList.appendChild(li);
    } else {
        //TODO: Hibaüzenet megjelenítése, ha a mezők üresek
    }
});
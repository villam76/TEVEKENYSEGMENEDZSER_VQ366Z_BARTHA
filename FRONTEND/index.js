const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("newtask");
const durationInput = document.getElementById("newtaskduration");
const taskList = document.getElementById("taskList");
const submitContainer = document.getElementById("submitContainer");
let submitButton = null;


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
        checkList();
    });
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
    durationInput.value = "";

    checkList();
});

function checkList() {
    if (taskList.children.length > 0) {
        if (!submitButton) {
            submitButton = document.createElement("button");
            submitButton.classList.add("btn", "btn-success", "mt-3");
            submitButton.innerText = "Beosztás Generálása";
            submitButton.addEventListener("click", function () {
                const daysToComplete = prompt("Hány nap alatt szeretnéd teljesíteni?");

                if (daysToComplete !== null) {
                    const days = parseInt(daysToComplete, 10);
                    
                    if (isNaN(days) || days < 1) {
                        alert("Érvényes számot adj meg!");
                        return;
                    }

                taskList.innerHTML = ""; 
                submitButton.remove(); 
                submitButton = null;
                }
            });
            submitContainer.appendChild(submitButton);
        }
    } else if (submitButton) {
        submitButton.remove();
        submitButton = null;
    }
}
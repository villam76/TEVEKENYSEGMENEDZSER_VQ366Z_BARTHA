const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("newtask");
const durationInput = document.getElementById("newtaskduration");
const taskList = document.getElementById("taskList");
const submitContainer = document.getElementById("submitContainer");
let submitButton = null;
let tasks = [];


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
        tasks = tasks.filter(task => task.name !== taskName);
        checkList();
    });
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    tasks.push({ name: taskName, duration: taskDuration });

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

                    fetch("http://localhost:5063/api/timemanager", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ items: tasks, daysToComplete: days })
                    }).then(response => response.json())
                      .then(schedule =>{
                        console.log(schedule);
                        generateScheduleTable(schedule);
                    });

                taskList.innerHTML = "";
                tasks = [];
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
function generateScheduleTable(schedule) {
    const tableContainer = document.getElementById('scheduleTableContainer');
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    // Táblázat fejléc (napok)
    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');
    theadRow.innerHTML = '<th>Idő (óra)</th>';
    
    const numDays = Math.max(...schedule.map(task => task.day));  // ... egyenként adja vissza a tömb elemeit, map bejárja
    for (let i = 1; i <= numDays; i++) {
        theadRow.innerHTML += `<th>${i}. nap</th>`;
    }
    thead.appendChild(theadRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    
    for (let hour = 7; hour <= 17; hour++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${hour}:00</td>`;

        // Feladatok beosztása a megfelelő időpontokhoz
        for (let day = 1; day <= numDays; day++) {
            const cell = document.createElement('td');
            const taskForThisHour = schedule.filter(task => task.day === day && task.startHour <= hour && task.endHour > hour);

            if (taskForThisHour.length > 0) {
                const task = taskForThisHour[0];
                cell.innerHTML = `${task.name}`;
            } else {
                cell.innerHTML = '<span class="text-success">Szünet</span>';
            }

            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}
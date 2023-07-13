let savedTasks = [];
const defaultTasks = [
    "3 Litre Su İç",
    "Ödevleri Yap",
    "En Az 3 Saat Kodlama Yap",
    "Yemek Yap",
    "50 Sayfa Kitap Oku"
];
const taskList = document.querySelector("#list");
const taskInput = document.querySelector("#task");

const closeIcon = `<span class="close" onclick="deleteTask(this.parentNode)" aria-label="Close" aria-hidden="true">&times;</span>`;

if (localStorage.getItem('savedTasks') === null || localStorage.getItem('savedTasks').length === 2) {
    defaultTasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${task}${closeIcon}`;
        listItem.addEventListener("click", toggleTask);
        savedTasks.push(listItem.innerHTML);
        taskList.append(listItem);
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    });
}
else {
    savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
    savedTasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${task}`;
        listItem.addEventListener("click", toggleTask);
        taskList.append(listItem);
    });
}
function toggleTask() {
    this.classList.toggle("checked");
}

function addTask() {
    
    if (taskInput.value.length > 0 && !(taskInput.value.trim().length === 0)) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `${taskInput.value}${closeIcon}`;
        listItem.addEventListener("click", toggleTask);
        taskList.append(listItem);
        savedTasks.push(listItem.innerHTML);
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
        $('.success').toast('show');
        taskInput.value = "";
    } else {
        $('.error').toast('show');
        taskInput.value = "";
    }
}

function deleteTask(parentNode) {
    savedTasks.splice(savedTasks.indexOf(parentNode.innerHTML), 1);
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    parentNode.remove();
}
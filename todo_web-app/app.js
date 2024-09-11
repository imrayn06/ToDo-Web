let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [
    {
        content: "content tast 1",
        status: "doing"
    },
    {
        content: "content tast 2",
        status: "complete"
    }
];

if (localStorage.getItem('listTask') != null) {
    listTask = JSON.parse(localStorage.getItem('listTask'));
}

function saveLocalStorage() {
    localStorage.setItem('listTask', JSON.stringify(listTask));
}
btnAdd.onclick = function (event) {
    event.preventDefault();

    let content = document.getElementById('task').value;
    if (content != '') {
        listTask.unshift({
            content: content,
            status: 'doing'
        })
    }
    addTaskToHTML();
    document.getElementById('task').value = '';

    saveLocalStorage();
}


function addTaskToHTML() {
    list.innerHTML = '',
        listTask.forEach((task, index) => {
            let newTask = document.createElement('li');
            newTask.classList.add(task.status);
            newTask.innerHTML = `
            <div class="complete-icon" onClick="completeTask(${index})">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            
            </div>
            <div class="content">${task.content}</div>
            <div class="close-content" onClick="deleteTask(${index})">
                <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            
            </div>`;
            list.appendChild(newTask);
        })
}
addTaskToHTML();

function completeTask(index) {
    listTask[index].status = 'complete';
    addTaskToHTML();
    saveLocalStorage();
}

function deleteTask(index) {
    listTask = listTask.filter((task, newIndex) => { return newIndex != index });
    addTaskToHTML();
    saveLocalStorage();
}

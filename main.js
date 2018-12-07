// UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

addEventListeners();

function addEventListeners(){

    document.addEventListener('DOMContentLoaded', getTasks);
    // add form listener
    form.addEventListener('submit', formSubmit);
    //add listener to collection
    taskList.addEventListener('click', removeTask);
    // clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', searchTask);

}

// form submit
function formSubmit(e) {
    e.preventDefault();
    const text = taskInput.value;

    if(text === ''){
        return alert('enter text');
    }

    createLi(text);
    storeTaskInLocalStorage(text);
    taskInput.value = '';
    taskInput.blur();
}

// remove task
function removeTask(e) {
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            taskList.removeChild(e.target.parentElement.parentElement);
            removeTaskFromStorage(e.target.parentElement.parentElement);
        }
    }
}

// clear tasks
function clearTasks(e) {
    e.preventDefault();

    if(confirm('Are you sure to delete all tasks')){
        while(taskList.firstChild){
            taskList.firstChild.remove();
        }

        clearStorage();
    }
}

// search task
function searchTask() {
    console.log('da');
    const text = filter.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach( (li) => {
        const item = li.firstChild.textContent;

        if( item.toLowerCase().indexOf(text) != -1){
            li.style.display = 'block';
        }else{
            li.style.display = 'none';
        }
    });
}

// create li
function createLi(text) {

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(text));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
}

// put item in local storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get local storage tasks
function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( task => {
        createLi(task);
    });
}

// remove task from local storage
function removeTaskFromStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index) => {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear local storage
function clearStorage(){
    localStorage.removeItem('tasks');
}
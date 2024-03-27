//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");
const todoContainer = document.querySelector(".todo-container");
const removeAll = document.querySelector(".removeAll");

//ALERTS!
const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

//EVENTS
document.addEventListener("DOMContentLoaded", function(){
    getTodos();
})
if(todoButton){
    todoButton.addEventListener('click', addTodo);
}
if(todoList){
    todoList.addEventListener('click', deleteCheck);
}

if(todoFilter){
    todoFilter.addEventListener('click' , fiterTodo);
}


//FUNCTIONS
function addTodo(event){

    event.preventDefault();

    const isEmpty = str => !str.trim().length;

    if(isEmpty(todoInput.value)){
        alertWarning.style.display = "block";
        setTimeout(() => {
            alertWarning.style.display = "none";
        }, 1500);

    } else {
        alertSuccess.style.display = "block";
        setTimeout(()=> {
            alertSuccess.style.display = "none";
        }, 1500);
    
        saveLocalTodos(todoInput.value);

    const todoDIv = document.createElement("div");
    todoDIv.classList.add("todo");
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML ="<i class='fas fa-check-circle'></i>"
    completedButton.classList.add("complete-btn");
    todoDIv.appendChild(completedButton)
    
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDIv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.innerHTML ="<i class='fa fa-minus-circle'></i>"
    trashButton.classList.add("trash-btn");
    todoDIv.appendChild(trashButton);
    todoList.appendChild(todoDIv);

    todoInput.value = " ";
    }
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocaleStorage(todo)
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed")
    }
}

function fiterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (item){
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
    const todoDIv = document.createElement("div");
    todoDIv.classList.add("todo");
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML ="<i class='fas fa-check-circle'></i>"
    completedButton.classList.add("complete-btn");
    todoDIv.appendChild(completedButton)
    
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDIv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.innerHTML ="<i class='fa fa-minus-circle'></i>"
    trashButton.classList.add("trash-btn");
    todoDIv.appendChild(trashButton);
    todoList.appendChild(todoDIv);

    })
}

function removeLocaleStorage(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos));
}

if (removeAll) {
    removeAll.addEventListener('click', deleteAllTodos);
}

function deleteAllTodos() {
    const todos = todoList.querySelectorAll('.todo');
    
    todos.forEach(todo => {
        todo.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        todo.style.transform = "translateX(-8rem)";
        todo.style.opacity = 0;
    });

    setTimeout(() => {
        todoList.innerHTML = "";
    }, 500);
    localStorage.removeItem("todos");
}

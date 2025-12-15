const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let todos = [];
let deletedTodo = null;
const MAX_TODOS = 50;

function updateTodoCounter() {
    const counter = document.getElementById("todo-counter");
    counter.innerHTML = `You've got <span style="font-size: 1.1em; color: #b44040ff; font-style: italic; text-shadow: 0 0 10px white;">(${todos.length}/${MAX_TODOS})</span> todos.`;
}

const toastUndoBtn = document.getElementById("toast-undo-btn");
toastUndoBtn.addEventListener("click", undoDelete);

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    const todoId = parseInt(li.id);
    deletedTodo = todos.find((todo) => todo.id === todoId);
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
    updateTodoCounter();

    li.classList.add("fade-out");
    setTimeout(() => {
        li.remove();
    }, 1200);

    showToast();
}

function undoDelete() {
    if (deletedTodo !== null) {
        todos.push(deletedTodo);
        paintTodo(deletedTodo);
        saveTodos();
        updateTodoCounter();
        deletedTodo = null;
        hideToast();
    }
}

document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        undoDelete();
    }
});

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    span.classList.add("todo-text");
    const button = document.createElement("button");
    button.innerText = "✓";
    button.addEventListener("click", deleteTodo);
    button.classList.add("checkbtn")
    li.appendChild(button);
    li.appendChild(span);
    todoList.appendChild(li);
}

function handletodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";

    if (todos.length >= MAX_TODOS) {
        alert(`Maximum ${MAX_TODOS} todos allowed!`);
        return;
    }

    const newTodoObj = {
        text: newTodo, id: Date.now(),
    };
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
    updateTodoCounter();
}

todoForm.addEventListener("submit", handletodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
    updateTodoCounter();
}

let toastTimeout = null;

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 4000);
}

function hideToast() {
    const toast = document.getElementById("toast");
    toast.classList.remove("show");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 300);
}

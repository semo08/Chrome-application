const loginForm = document.querySelector("#login-form")
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function loginFirst() {
    loginInput.focus();
}

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);   
    paintGreetings(username);

    const todoInput = document.querySelector("#todo-form input");
    if (todoInput) {   
        todoInput.focus();
    }
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.classList.remove(HIDDEN_CLASSNAME);
    }
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
    window.addEventListener("load", loginFirst);
} else {
    paintGreetings(savedUsername);

    const todoInput = document.querySelector("#todo-form input");
    if (todoInput) {
        todoInput.focus();
    }
}

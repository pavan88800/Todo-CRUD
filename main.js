let input = document.getElementById("todo");
let button = document.getElementById("AddTodo");
let container = document.getElementById("container");
let ls = document.getElementById("containerCompleted");
(() => input.focus())();
let Todo;
function getStore() {
  if (localStorage.getItem("todo") !== null) {
    Todo = JSON.parse(localStorage.getItem("todo"));
  } else {
    Todo = [];
  }
}
//Adding Todo
function AddTodo(e) {
  e.preventDefault();
  let randomId = Math.floor(Math.random() * 1000);
  let value = input.value;
  if (value === "") return;
  const objUser = {
    id: randomId,
    text: value,
    isDone: false,
  };
  Todo.push(objUser);
  renderTodo(objUser);
  input.value = "";
  localStorage.setItem("todo", JSON.stringify(Todo));
}

function renderAllTodo() {
  Todo.forEach((el) => {
    renderTodo(el);
  });
}
button.addEventListener("click", (e) => AddTodo(e));
document.addEventListener("DOMContentLoaded", getStore());
document.body.addEventListener("onload", renderAllTodo());

let completed = document.getElementById("completed");
//Rendering Todo
function renderTodo(obj) {
  TodoListUI(obj);
}

function TodoListUI(el) {
  const p = document.createElement("p");
  if (el.isDone !== true) {
    p.innerHTML = el.text;
    const span = document.createElement("span");
    span.innerHTML = "X";
    span.className = "deleteSpan";
    span.setAttribute("data-id", el.id);
    span.style = "margin-left:50px; cursor:pointer";
    span.onclick = (e) => removeTodo(e);
    const btn = document.createElement("button");
    btn.innerHTML = "Edit";
    btn.style = "margin-left:50px; cursor:pointer";
    btn.setAttribute("data-id", el.id);
    btn.className = "edit-todo";
    btn.onclick = (e) => update(e);
    const btnComplete = document.createElement("button");
    btnComplete.innerHTML = "completed";
    btnComplete.id = "completed";
    btnComplete.setAttribute("data-id", el.id);
    btnComplete.onclick = (e) => isCompleted(e);
    p.appendChild(span);
    p.appendChild(btn);
    p.appendChild(btnComplete);
    container.appendChild(p);
  } else {
    ls.appendChild(p);
    p.innerHTML = el.text;
    const span = document.createElement("span");
    span.innerHTML = "X";
    span.className = "deleteSpan";
    span.setAttribute("data-id", el.id);
    span.style = "margin-left:50px; cursor:pointer";
    const btn = document.createElement("button");
    btn.innerHTML = "Edit";
    btn.style = "margin-left:50px; cursor:pointer";
    btn.onclick = (e) => update(e);
    btn.setAttribute("data-id", el.id);
    btn.className = "edit-todo";
    const btnComplete = document.createElement("button");
    btnComplete.innerHTML = "completed";
    btnComplete.id = "completed";
    btnComplete.setAttribute("data-id", el.id);
    btnComplete.onclick = (e) => isCompleted(e);
    p.appendChild(span);
    p.appendChild(btn);
    p.appendChild(btnComplete);
    ls.appendChild(p);
  }
}

document
  .getElementById("containerCompleted")
  .addEventListener("click", (e) => removeTodo(e));

//removing Todo
function removeTodo(e) {
  let { id } = e.target.dataset;
  if (e.target.classList.contains("deleteSpan")) {
    Todo = Todo.filter((el) => el.id.toString() !== id);
    localStorage.setItem("todo", JSON.stringify(Todo));
    e.target.closest("p").remove();
  }
}

//mutating state
function isCompleted(e) {
  // container.innerHTML = "";
  let { id } = e.target.dataset;
  if (e.target.id === "completed") {
    Todo = Todo.map((el) => {
      if (el.id.toString() === id) {
        return {
          ...el,
          isDone: !el.isDone,
        };
      }
      return el;
    });
  }
  localStorage.setItem("todo", JSON.stringify(Todo));
  if (e.target.id === "completed") {
    window.location.reload();
  }
}

//update Todo
let edit = document.getElementById("editTodoValue");
let currentUser = {};
function update(e) {
  console.log(e.target);
  document.getElementById("editContainer").style = "display:block";
  let { id } = e.target.dataset;
  let ele = Todo.find((el) => el.id.toString() === id);
  edit.value = ele.text;
  currentUser = ele;
}

function EditTodo() {
  if (event.target.id === "EditButton") {
    console.log(edit.value);
    Todo = Todo.map((el) => {
      if (el.id === currentUser.id) {
        return {
          ...el,
          text: edit.value,
        };
      }
      return el;
    });
  }
  localStorage.setItem("todo", JSON.stringify(Todo));
  document.getElementById("editContainer").style = "display:none";
  window.location.reload();
}
document
  .getElementById("EditButton")
  .addEventListener("click", () => EditTodo());

let search = document.querySelector("#search");

// search Todo by text
search.addEventListener("input", function () {
  let filterTodo = Todo.filter((el) =>
    el.text.toLowerCase().includes(search.value.toLowerCase())
  );
  Todo = filterTodo;
  renderTodo();
  getStore();
});

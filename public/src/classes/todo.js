"use strict";

/**
 * Todo class , include all the methods used to :
 * POST todo
 * PATCH todo
 * DELETE todo
 * GET todo
 * GET todos
 * Update todo
 */

export class Todo {
  todoText = "";
  completed = false;

  constructor(todoData) {
    Object.assign(this, todoData);
  }

  // POST a new todo
  postTodo = async (newTodo) => {
    try {
      const response = await fetch("/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "content-type": "application/json; charset= UTF-8",
        },
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  // GET one todo by Id
  getOneTodo = async (id) => {
    try {
      const response = await fetch(`/todos/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // GET all todos

  getAllTodos = async () => {
    try {
      const response = await fetch("/todos");
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // PATCH todo
  patchTodo = async (id, change) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(change),
        headers: { "content-type": "application/json; charset = UTF-8" },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  updateTodos = async () => {
    const allTodosData = await this.getAllTodos();
    const render = await this.renderTodos(allTodosData);
    const appendTodo = document.getElementById("root");
    appendTodo.innerHTML = "";
    appendTodo.appendChild(render);
  };

  renderTodo = async (todo) => {
    // create a div for todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-parentDiv");

    // create a list for todo
    const todoLi = document.createElement("li");
    todoLi.innerText = `${todo.id} - ${todo.todoText}`;
    todoLi.classList.add("todo-li");

    // complete button
    const completedButton = document.createElement("input");
    completedButton.type = "checkbox";
    completedButton.classList.add("completed-btn");
    completedButton.id = todo.id;
    completedButton.checked = todo.completed;
    completedButton.addEventListener("click", async () => {
      try {
        const id = todo.id;
        const checked = todo.completed;
        let uncheck = false;
        if (checked === false) {
          uncheck = true;
        } else {
          uncheck = false;
        }
        const response = await fetch(`/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ completed: uncheck }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();

        this.updateTodos();
      } catch (err) {
        console.log(err);
      }
    });

    // edit button

    const editButton = document.createElement("button");
    editButton.id = todo.id;
    editButton.innerHTML = '<i class="fas fa-pen-square"></i>';
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", async () => {
      const newTodoText = prompt("PLease Enter the new text!");
      const id = todo.id;
      const newTodo = {
        id,
        todoText: newTodoText,
      };

      const modifiedTodo = await this.patchTodo(id, newTodo);
      this.updateTodos();
    });

    // delete button

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-btn");
    deleteButton.id = todo.id;
    deleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/todos/${deleteButton.id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        this.updateTodos();
        return data;
      } catch (err) {
        console.log(err);
      }
    });

    // append to todoDiv
    todoDiv.appendChild(todoLi);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(editButton);
    todoDiv.appendChild(deleteButton);

    return todoDiv;
  };

  renderTodos = async (todos) => {
    // divContainer

    const divContainer = document.createElement("div");
    divContainer.classList.add("container");

    // create unordered list for todos

    const ulLi = document.createElement("ul");
    ulLi.classList.add("ul-ul");
    todos.map((todo) => {
      const liEl = document.createElement("li");
      liEl.id = todo.id;
      liEl.innerText = `${todo.id} - ${todo.todoText}`;

      ulLi.appendChild(liEl);
    });

    // append ulLi to the divContainer

    divContainer.appendChild(ulLi);

    return divContainer;
  };
}

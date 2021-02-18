"use strict";

import { Todo } from "../classes/todo.js";

// handler get all todos
export const handleGetAllTodos = async () => {
  const newTodo = new Todo();
  const allTodosData = await newTodo.getAllTodos();
  const render = await newTodo.renderTodos(allTodosData);
  const appendTodo = document.getElementById("root");
  appendTodo.innerHTML = "";
  appendTodo.appendChild(render);
};

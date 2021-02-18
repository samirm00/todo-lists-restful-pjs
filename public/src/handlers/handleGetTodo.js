"use strict";

import { Todo } from "../classes/todo.js";

// handler get one todo

export const handleGetOneTodo = async (target) => {
  const id = Number(target.currentTarget.form.id.value);

  const newTodo = new Todo();

  const todoData = await newTodo.getOneTodo(id);

  const render = await newTodo.renderTodo(todoData);
  const appendTodo = document.getElementById("root");
  appendTodo.innerHTML = "";
  appendTodo.appendChild(render);
};

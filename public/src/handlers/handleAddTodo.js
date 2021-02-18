"use strict";

import { Todo } from "../classes/todo.js";

export const handleAddTodo = async (target) => {
  const newTodo = new Todo({
    todoText: target.currentTarget.form.todoText.value,
    completed: target.currentTarget.form.completed.checked,
  });

  const todoData = await newTodo.postTodo(newTodo);
  const render = await newTodo.renderTodo(todoData);
  const appendTodo = document.getElementById("root");
  appendTodo.innerHTML = "";
  appendTodo.appendChild(render);
};

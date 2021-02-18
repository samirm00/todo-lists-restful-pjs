"use strict";

import { handleGetAllTodos } from "../handlers/handleGetAllTodos.js";

// listener get all todos

document
  .getElementById("get-todos")
  .addEventListener("click", handleGetAllTodos);

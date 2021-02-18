"use strict";

import { handleAddTodo } from "../handlers/handleAddTodo.js";

// listener add to do

document.getElementById("add-todo").addEventListener("click", handleAddTodo);

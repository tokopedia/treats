import React from "react";

import AsyncComponent from "@treats/component/async-component";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const TodoGraphqlPage = () => (
    <div>
        <TodoList />
        <TodoForm />
    </div>
);
  
export default AsyncComponent(module, TodoGraphqlPage);

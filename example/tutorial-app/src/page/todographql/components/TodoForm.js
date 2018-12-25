import React from "react";

import { Mutation } from "@treats/graphql";

import { todoMutation, todoQuery } from "@graphql/todo";

import style from "../todographql.css";

const TodoForm = () =>  (
    <Mutation 
        mutation={todoMutation.CreateListTodo}
        refetchQueries={[{ query: todoQuery.GetAllListTodoes }]}   
    >
        {(addTodo, { loading, error }) => {
            let input;
                
            return (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addTodo({ variables: { todoAction: input.value } });
                            input.value = "";
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button className={style.button__green} type="submit">Add Todo</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                </div>
            );
        }}
    </Mutation>

);
  
export default TodoForm;

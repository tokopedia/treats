import React, { Component } from "react";

import { Mutation } from "@treats/graphql";

import { todoMutation, todoQuery } from "@graphql/todo";

import style from "../todographql.css";

class TodoItem extends Component {
    render () {
        const { id, todoAction, status } = this.props;

        return (
            <Mutation 
                mutation={todoMutation.DeleteListTodo} 
                variables={{ id }} 
                refetchQueries={[{ query: todoQuery.GetAllListTodoes }]}    
            >
                {(deleteListTodo, { loading: deleteLoading, error: deleteError }) => (
                    <Mutation 
                        mutation={todoMutation.UpdateListTodo} 
                        variables={{ id, todoAction }} 
                        refetchQueries={[{ query: todoQuery.GetAllListTodoes }]}    
                    >
                        {(updateListTodo, { loading: updateLoading, error: updateError }) => (
                            <Mutation 
                                mutation={todoMutation.UpdateTodoStatus} 
                                variables={{ id, status: "done" }} 
                                refetchQueries={[{ query: todoQuery.GetAllListTodoes }]}    
                            >
                                {(updateTodoStatus, { loading, error }) => {
                                    let todo;

                                    return (
                                        <div >
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    updateListTodo({ variables: { todoAction: todo.value, id } });
                                                }}
                                            >
                                                <input
                                                    ref={node => {
                                                        todo = node;
                                                    }}
                                                    defaultValue={todoAction}
                                                    readOnly={status === "done"}
                                                />
                                                {status !== "done" && (
                                                    <span>
                                                        <button
                                                            className={style.button__orange} 
                                                            type="submit"
                                                        >
                                                            Update Todo
                                                        </button>
                                                        <button
                                                            className={style.button__green} 
                                                            onClick={updateTodoStatus}
                                                        >
                                                            Is it done?
                                                        </button>
                                                    </span>
                                                )}
                                                <button 
                                                    className={style.button__red}
                                                    onClick={deleteListTodo}
                                                >
                                                    Delete this todo
                                                </button>
                                            </form>
                                            {loading || (deleteLoading || updateLoading) && <p>Loading...</p>}
                                            {error || (deleteError || updateError) && <p>Error :( Please try again</p>}
                                        </div>
                                    );
                                }}
                            </Mutation>            
                        )}
                    </Mutation>
                )}
            </Mutation>
        );
    }
};
  
export default TodoItem;

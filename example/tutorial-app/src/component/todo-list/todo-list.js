import React from "react";

import { Query } from "@treats/graphql";

import { todoQuery } from "../../_graphql/todo";

import TodoItem from "../todo-item";

const TodoList = () => (
    <Query 
        query={todoQuery.GetAllTodoes}
        ssr={false}
        fetchPolicy="cache-and-network"
    >
        {
            ({ loading, error, data }) => {
                if (loading) return <p>Loading....</p>
                if (error) return <p style={{"color": "red"}}>ERROR</p>
                if (data.allTodoes) {
                    return (
                        <div>
                            {data.allTodoes.map(item => (
                                <TodoItem key={item.id} {...item} />
                            ))}
                        </div>
                    );
                }
                return (
                    <div>
                        No Data
                    </div>
                )
            }
        }
    </Query>
);
  
export default TodoList;

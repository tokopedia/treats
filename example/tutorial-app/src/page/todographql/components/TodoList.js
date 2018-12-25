import React from "react";

import { Query } from "@treats/graphql";

import { todoQuery } from "@graphql/todo";

import TodoItem from "./TodoItem";

const TodoList = () => (
    <Query 
        query={todoQuery.GetAllListTodoes}
        ssr={false}
        fetchPolicy="cache-and-network"
    >
        {
            ({ loading, error, data }) => {
                if (loading) return <p>Loading....</p>
                if (error) return <p style={{"color": "red"}}>ERROR</p>
                if (data.allListTodoes) {
                    return (
                        <div>
                            {data.allListTodoes.map(item => (
                                <TodoItem key={item.id} {...item} />
                            ))}
                        </div>
                    );
                }
            }
        }
    </Query>
);
  
export default TodoList;

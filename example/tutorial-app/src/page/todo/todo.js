import React from "react";
import { FormattedMessage, injectIntl } from "@treats/intl";
import Link from "@treats/component/link";
import { connect } from "@treats/redux";
import { Mutation } from "@treats/graphql";

import { todoMutation, todoQuery } from "../../_graphql/todo";

import TodoList from "../../component/todo-list";

import style from "./todo.css";

const Todo = ({ intl, name, nation }) => (
    <div>
        <Link href="/profile" isPush>Change Name</Link>
        <br />
        <FormattedMessage
            id="todo_title" 
            values={{
                name: name,
                nation: nation
            }}
        />
        <Mutation
            mutation={todoMutation.CreateTodo}
            refetchQueries={[{ query: todoQuery.GetAllTodoes }]} 
        >
            {(addTodo, { loading, error }) => {
                let input;

                if (loading) {
                    return (<p>Loading...</p>)
                }

                if (error) {
                    return (<p>Error :( Please try again</p>)
                }

                return (
                    <div className={style.todo_form}>
                        <form onSubmit={e => {
                            e.preventDefault();
                            addTodo({ variables: { todoAction: input.value } });
                            input.value = "";
                        }}>
                            <input ref={
                                node => {
                                    input = node;
                                }
                            } />
                            <button>{intl.formatMessage({id: "submit"})}</button>
                        </form>
                    </div>
                )
            }}
        </Mutation>
        <TodoList />
        <div className={style.todo__locale_switcher_container}>
            <a
                className={`${style.todo__locale_switcher}${
                    intl.locale === "en" ? " active" : ""
                }`}
                href="/?lang=en"
            >
                English
            </a>
            <a
                className={`${style.todo__locale_switcher}${
                    intl.locale === "id" ? " active" : ""
                }`}
                href="/?lang=id"
            >
                Indonesian
            </a>
        </div>
    </div>
)

const mapStateToProps = state => ({
    name: state.profile.name,
    nation: state.profile.nation
})

export default connect(mapStateToProps)(injectIntl(Todo));

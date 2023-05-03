import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import s from "./todoheader.module.css"
import {AiOutlinePlusCircle} from 'react-icons/ai'

export function Header( {onAddTask} ) {
    const [title, setTitle] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        onAddTask(title);
        setTitle('');
    }

    function onChangeTitlt(event) {
        setTitle(event.target.value);
    }

    return (
        <div className={s.header}>
            <h2>To do list</h2>
            <form onSubmit={handleSubmit} className={s.newTaskForm}>
                <input placeholder="Add task" type="text" value={title} onChange={onChangeTitlt}/>
                <button>
                    Create
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>
        </div>
    )
}
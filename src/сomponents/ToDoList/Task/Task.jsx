import React from "react";
import s from "./task.module.css"
import {TbTrash} from 'react-icons/tb'
import {BsFillCheckCircleFill} from 'react-icons/bs'

export function Task({task, onComplete, onDelete}) {

    return (
        <div className={s.task}>
            <button className={s.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isComplited ? <BsFillCheckCircleFill /> : <div/>}
            </button>

            <p className={task.isComplited ? s.textCompleted : ""}>{task.title}</p>

            <button className={s.deleteButton} onClick={() => onDelete(task.id)}>
                <TbTrash size={20}/>
            </button>
        </div>
    )
}
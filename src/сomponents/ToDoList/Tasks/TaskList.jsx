import React from "react";
import s from "./tasks.module.css"
import { Task } from "../Task/Task";

export function Tasks( {tasks, onComplete, onDelete} ) {
    const tasksQuantity = tasks.length;
    const comletedTask = tasks.filter(task => task.isComplited).length;

    return (
        <section className={s.tasks}>
            <header className={s.header}>
                <div>
                    <p>Create task</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={s.textPurple}>Complited</p>
                    <span>{comletedTask} of {tasksQuantity}</span>
                </div>
            </header>

            <div className={s.list}>
                {tasks.map(task => (
                    <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete}/>
                ))}
                
            </div>
            
        </section>
    )
}
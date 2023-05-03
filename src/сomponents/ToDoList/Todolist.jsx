import React, { useState, useEffect } from "react";
import { Header } from "./Header/TodoHeader";
import { Tasks } from "./Tasks/TaskList";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";
import { compose } from "redux";

const LOCAL_STORAGE_KEY = "todo:savedTasks"

const Todolist = (props) => {

    const [tasks, setTasks] = useState([]);

    function loadSavedTasks() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(saved){
            setTasks(JSON.parse(saved));
        }
    }

    useEffect(() => {
        loadSavedTasks();
    }, [])

    function setTasksAndSaved(newTask) {
        setTasks(newTask);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTask));
    }


    function addTask(taskTitle) {
        setTasksAndSaved([
            ...tasks,
            {
                id: Date.now(),
                title: taskTitle,
                isComplited: false
            }
        ]);
    }

    function deleteTaskById(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasksAndSaved(newTasks);
    }

    function toggleTaskCompletedById(taskId) {
        const newTask = tasks.map(task => {
            if(task.id === taskId) {
                return {
                    ...task,
                    isComplited: !task.isComplited
                }
            }
            return task;
        });

        setTasksAndSaved(newTask);
    }

    return (
        <div>
            <Header onAddTask={addTask}/>
            <Tasks tasks={tasks} onComplete={toggleTaskCompletedById} onDelete={deleteTaskById}/>
        </div>
        
    )
}

export default compose(withAuthRedirect)(Todolist);
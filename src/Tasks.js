import React from 'react'
import Task from './Task'

const Tasks = ({tasks, checkToggle}) => {
    return (
        tasks.map(task => {
            return <Task key={task.id} task={task} checkToggle={checkToggle} />
        })
    )
}

export default Tasks

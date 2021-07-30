import React from 'react'

const Task = ({task, checkToggle}) => {
    function checkClick() {
        checkToggle(task.id)
    }
    return (
        <li className="list-group-item">
            {task.name}
            <div style={{paddingLeft: "20px"}}><input className="form-check-input" type="checkbox" checked={task.complete} onChange={checkClick} /></div>  
        </li>
    )
}

export default Task
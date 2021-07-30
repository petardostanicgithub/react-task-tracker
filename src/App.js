import {useState, useRef, useEffect} from "react";
import Tasks from "./Tasks";
import {v4 as uuidv4} from "uuid"

const LOCAL_STORAGE_KEY = 'react-task-tracker-tasks'

function App() {
  const [tasks, updateTasks] = useState([])
  const taskNameRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTasks) updateTasks(storedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])
  
  function checkToggle(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    updateTasks(newTasks)
  }

  function addTask(e) {
    const name = taskNameRef.current.value
    if (name === '') return
    updateTasks(previousTasks => {
      return [...previousTasks, {id: uuidv4(), name: name, complete: false}]
    })
    taskNameRef.current.value = null
  }

  function clearComplete() {
    const newTasks = tasks.filter(task => !task.complete)
    updateTasks(newTasks)
  }

  return (
    <div className="container mt-5">
      <div className="input-group mb-3">
        <input ref={taskNameRef}  type="text" className="form-control" placeholder="Enter a task..." aria-label="Enter a task..."  />
      </div>
      <div className="mb-3">{tasks.filter(task => !task.complete).length} tasks left</div>
      <div className="btn-group mb-5" role="group" aria-label="Button group">
        <button type="button" className="btn btn-primary" onClick={addTask}>Add a task</button>
        <button type="button" className="btn btn-danger" onClick={clearComplete}>Clear completed</button>
      </div>
      <ul className="list-group">
        <Tasks tasks={tasks} checkToggle={checkToggle}/>
      </ul>
    </div>
  )
}

export default App;


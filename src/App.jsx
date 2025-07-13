import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  const [taskStatus, setTaskStatus] = useState('todo')

  const API_BASE = 'https://gammashelf-perfectthink-3000.codio.io/tasks'

  const getTasks = async () => {
    try {
      const res = await fetch(API_BASE, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      if (!res.ok) throw new Error('Failed to load tasks')
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.error('Error in getTasks:', err)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const addTask = async (task) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(task)
      })

      if (!res.ok) throw new Error('Failed to add task')
      getTasks()
    } catch (err) {
      console.error('Error in addTask:', err)
    }
  }

  // ✅ NEW: Update Task
  const updateTask = async (updatedTask) => {
    try {
      const res = await fetch(`${API_BASE}/${updatedTask.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ status: updatedTask.status })
      })

      if (!res.ok) throw new Error('Failed to update task')
      getTasks()
    } catch (err) {
      console.error('Error in updateTask:', err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      text: taskText,
      status: taskStatus
    }
    addTask(newTask)
    setTaskText('')
    setTaskStatus('todo')
  }

  return (
    <div>
      <h1>Tasks</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Task Text:
            <input
              type="text"
              required
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </label>
        </div>
        <button type="submit">Create Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text} ({task.status})
            <div>
              <button
                onClick={() => updateTask({ ...task, status: 'todo' })}
                disabled={task.status === 'todo'}
              >
                Todo
              </button>
              <button
                onClick={() => updateTask({ ...task, status: 'doing' })}
                disabled={task.status === 'doing'}
              >
                Doing
              </button>
              <button
                onClick={() => updateTask({ ...task, status: 'done' })}
                disabled={task.status === 'done'}
              >
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

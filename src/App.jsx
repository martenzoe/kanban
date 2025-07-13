import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  const [taskStatus, setTaskStatus] = useState('todo')

  const getTasks = async () => {
    try {
      const res = await fetch('https://gammashelf-perfectthink-3000.codio.io/tasks', {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      if (!res.ok) throw new Error('Failed to load tasks')
      const data = await res.json()
      console.log('Loaded tasks:', data)
      return data
    } catch (err) {
      console.error('Error in getTasks:', err)
      return []
    }
  }

  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault() // ❗ Prevent page refresh
    const newTask = {
      text: taskText,
      status: taskStatus
    }
    console.log('New task:', newTask)

    // Clear form fields
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
          <li key={task.id}>{task.text} ({task.status})</li>
        ))}
      </ul>
    </div>
  )
}

export default App

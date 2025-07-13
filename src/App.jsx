import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  // Fetches tasks from the backend
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

  // Load tasks on first render
  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

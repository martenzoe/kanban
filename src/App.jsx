import { useEffect, useState } from 'react'
import './App.css'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  const [taskStatus, setTaskStatus] = useState('todo')
  const [taskDate, setTaskDate] = useState('')
  const [taskComment, setTaskComment] = useState('')
  const [loading, setLoading] = useState(false)

  const getTasks = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/tasks`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const addTask = async () => {
    if (!taskText.trim()) return alert('Please enter a task')

    setLoading(true)
    const newTask = {
      text: taskText,
      status: taskStatus,
      date: taskDate,
      comment: taskComment
    }

    try {
      await fetch(`${BACKEND_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })
      getTasks()
      setTaskText('')
      setTaskStatus('todo')
      setTaskDate('')
      setTaskComment('')
    } catch (err) {
      console.error('Error adding task:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      getTasks()
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id) => {
    if (!confirm('Delete this task?')) return
    try {
      await fetch(`${BACKEND_URL}/tasks/${id}`, { method: 'DELETE' })
      getTasks()
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const dragged = tasks.find(t => t.id === active.id)
    const target = tasks.find(t => t.id === over.id)

    if (dragged && target && dragged.status !== target.status) {
      updateTask(dragged.id, { status: target.status })
    }
  }

  const renderColumn = (status, label) => {
    const filteredTasks = tasks.filter(t => t.status === status)

    return (
      <div className="column">
        <h2>{label}</h2>
        <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <ul>
            {filteredTasks.map(task => (
              <SortableTask
                key={task.id}
                task={task}
                updateTask={(updates) => updateTask(task.id, updates)}
                deleteTask={() => deleteTask(task.id)}
              />
            ))}
            {filteredTasks.length === 0 && <p className="empty">No tasks</p>}
          </ul>
        </SortableContext>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1>My Kanban</h1>

      <form onSubmit={e => { e.preventDefault(); addTask() }} className="task-form">
        <input placeholder="Task" value={taskText} onChange={e => setTaskText(e.target.value)} />
        <input type="date" value={taskDate} onChange={e => setTaskDate(e.target.value)} />
        <input placeholder="Comment (optional)" value={taskComment} onChange={e => setTaskComment(e.target.value)} />
        <select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </form>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="kanban-columns">
          {renderColumn('todo', 'Todo')}
          {renderColumn('doing', 'Doing')}
          {renderColumn('done', 'Done')}
        </div>
      </DndContext>
    </div>
  )
}

function SortableTask({ task, updateTask, deleteTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <div className="task-header">
        <span className={`status-dot ${task.status}`}></span>

        <div className="task-content">
          <strong>{task.text}</strong>
          {task.date && <small>{task.date}</small>}
          {task.comment && <p className="comment">{task.comment}</p>}
        </div>

        <span
          className="drag-handle"
          ref={setActivatorNodeRef}
          {...listeners}
          title="Drag"
        >
          ☰
        </span>
      </div>

      <div className="task-buttons">
        {task.status !== 'todo' && (
          <button className="todo" onClick={() => updateTask({ status: 'todo' })}>Todo</button>
        )}
        {task.status !== 'doing' && (
          <button className="doing" onClick={() => updateTask({ status: 'doing' })}>Doing</button>
        )}
        {task.status !== 'done' && (
          <button className="done" onClick={() => updateTask({ status: 'done' })}>Done</button>
        )}
        <button className="delete" onClick={deleteTask}>Delete</button>
      </div>
    </li>
  )
}

export default App

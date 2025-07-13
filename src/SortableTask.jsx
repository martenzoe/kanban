import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

      <div className="task-actions">
        {task.status !== 'todo' && (
          <button className="btn-todo" onClick={() => updateTask({ ...task, status: 'todo' })}>
            Todo
          </button>
        )}
        {task.status !== 'doing' && (
          <button className="btn-doing" onClick={() => updateTask({ ...task, status: 'doing' })}>
            Doing
          </button>
        )}
        {task.status !== 'done' && (
          <button className="btn-done" onClick={() => updateTask({ ...task, status: 'done' })}>
            Done
          </button>
        )}
        <button className="btn-delete" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default SortableTask

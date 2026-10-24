export function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li
      style={{
        padding: '12px 16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: task.isCompleted ? '#f9f9f9' : '#fff',
        opacity: task.isCompleted ? 0.7 : 1,
        transition: 'all 0.2s ease'
      }}
    >
      <div>
        <h4 style={{ margin: 0, textDecoration: task.isCompleted ? 'line-through' : 'none', color: task.isCompleted ? '#888' : '#222' }}>
          {task.title}
        </h4>
        {task.description && (
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>
            {task.description}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onToggleTask(task.id)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: task.isCompleted ? '#e0e0e0' : '#10b981',
            color: task.isCompleted ? '#333' : '#fff',
            cursor: 'pointer'
          }}
        >
          {task.isCompleted ? 'Geri Al' : 'Tamamla'}
        </button>

        {onDeleteTask && (
          <button
            onClick={() => onDeleteTask(task.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Sil
          </button>
        )}
      </div>
    </li>
  );
}
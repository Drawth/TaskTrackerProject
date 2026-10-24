import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { CheckCircle2, RotateCcw, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'; 

function App() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setInputError(true);
      return;
    }
    addTask(title, description);
    setTitle('');
    setDescription('');
    setInputError(false);
  };

  return (
    <div className="app-container">
      <h2 className="header-title">Görev Yöneticisi</h2>
      
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            className={`task-input ${inputError ? 'error-border' : ''}`}
            value={title} 
            onChange={(e) => {
              setTitle(e.target.value);
              setInputError(false);
            }} 
            placeholder="Ne yapacaksın?" 
          />
          {inputError && <span className="error-text">Görev başlığı boş bırakılamaz!</span>}
          <input 
            className="task-input"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Detaylar (opsiyonel)" 
          />
        </div>
        <button className="btn-add" type="submit">
          <Plus size={20} /> Ekle
        </button>
      </form>

      {loading ? <p className="loading-text">Görevler yükleniyor...</p> : (
        <ul className="task-list">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.li 
                key={task.id} 
                layout // Yer değiştirme (alta süzülme) animasyonunu garanti eder
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`task-item ${task.isCompleted ? 'completed' : ''}`}
              >
                <div className="task-content">
                  <p className="task-title">{task.title}</p>
                  {task.description && <p className="task-desc">{task.description}</p>}
                </div>
                <div className="task-actions">
                  <button 
                    className="btn-action btn-complete"
                    onClick={() => toggleTask(task.id)}
                    title={task.isCompleted ? 'Geri Al' : 'Tamamla'}
                  >
                    {task.isCompleted ? <RotateCcw size={18} /> : <CheckCircle2 size={18} />}
                  </button>
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => deleteTask(task.id)}
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default App;
import { useState } from 'react';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Görev Başlığı..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
      />
      <input
        type="text"
        placeholder="Açıklama (Opsiyonel)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
      />
      <button 
        type="submit" 
        style={{ padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Görev Ekle
      </button>
    </form>
  );
}
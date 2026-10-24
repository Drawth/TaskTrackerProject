import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5086/api/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sadece veriyi çeker, loading ekranını tetiklemez
  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    }
  };

  const addTask = async (title, description) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    await fetchTasks();
  };

const toggleTask = async (id) => {
    setTasks(prevTasks => {
      const updated = prevTasks.map(task => 
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      );
      
      return updated.sort((a, b) => {
        // 1. Önce duruma göre ayır (Aktifler üstte, tamamlananlar altta)
        if (a.isCompleted !== b.isCompleted) {
          return Number(a.isCompleted) - Number(b.isCompleted);
        }
        // 2. Kendi içlerinde tarihe göre en yeniyi üste al (Orijinal sırayı korur)
        // Eğer createdAt verisi gelmiyorsa b.id - a.id şeklinde de değiştirebilirsin
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); 
      });
    });

    await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await fetchTasks();
  };

  useEffect(() => {
    // Loading ekranı sadece sayfa ilk açıldığında 1 kez çalışır
    const loadInitial = async () => {
      setLoading(true);
      await fetchTasks();
      setLoading(false);
    };
    loadInitial();
  }, []);

  return { tasks, loading, addTask, toggleTask, deleteTask };
}
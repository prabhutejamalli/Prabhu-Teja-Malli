import React, { useState } from 'react';
import styles from './TaskManagerDemo.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = 'high' | 'medium' | 'low';
type Filter   = 'all' | 'active' | 'completed';

interface Task {
  id: number;
  text: string;
  priority: Priority;
  done: boolean;
  createdAt: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_TASKS: Task[] = [
  { id: 1, text: 'Design homepage wireframes',          priority: 'high',   done: false, createdAt: 'Today'     },
  { id: 2, text: 'Set up React project structure',      priority: 'medium', done: true,  createdAt: 'Yesterday' },
  { id: 3, text: 'Implement user authentication',       priority: 'high',   done: false, createdAt: 'Today'     },
  { id: 4, text: 'Write API documentation',             priority: 'low',    done: false, createdAt: '2 days ago'},
  { id: 5, text: 'Add dark mode support',               priority: 'medium', done: true,  createdAt: 'Yesterday' },
  { id: 6, text: 'Optimise bundle size',                priority: 'medium', done: false, createdAt: 'Today'     },
  { id: 7, text: 'Integrate payment gateway',           priority: 'high',   done: false, createdAt: 'Today'     },
  { id: 8, text: 'Configure CI/CD pipeline',            priority: 'low',    done: true,  createdAt: '3 days ago'},
];

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  high:   { label: 'High',   color: '#ef4444', bg: '#fee2e2' },
  medium: { label: 'Medium', color: '#f59e0b', bg: '#fef3c7' },
  low:    { label: 'Low',    color: '#10b981', bg: '#d1fae5' },
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TaskManagerDemo: React.FC = () => {
  const [tasks, setTasks]       = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter]     = useState<Filter>('all');
  const [newText, setNewText]   = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [nextId, setNextId]     = useState(INITIAL_TASKS.length + 1);

  const filtered = tasks.filter(t => {
    if (filter === 'active')    return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const stats = {
    total:     tasks.length,
    active:    tasks.filter(t => !t.done).length,
    completed: tasks.filter(t => t.done).length,
  };

  const addTask = () => {
    const text = newText.trim();
    if (!text) return;
    setTasks(prev => [
      { id: nextId, text, priority: newPriority, done: false, createdAt: 'Just now' },
      ...prev,
    ]);
    setNextId(n => n + 1);
    setNewText('');
  };

  const toggleTask = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const deleteTask = (id: number) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const clearCompleted = () =>
    setTasks(prev => prev.filter(t => !t.done));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask();
  };

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className={styles.app}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.appTitle}>✅ Task Manager</h1>
          <p className={styles.appDate}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>
            <span>{pct}% Complete</span>
            <span>{stats.completed}/{stats.total}</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      {/* ── Stats ── */}
      <div className={styles.stats}>
        {[
          { label: 'Total',     value: stats.total,     color: '#7c3aed' },
          { label: 'Active',    value: stats.active,    color: '#f59e0b' },
          { label: 'Completed', value: stats.completed, color: '#10b981' },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statValue} style={{ color: s.color }}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Add Task ── */}
      <div className={styles.addRow}>
        <input
          className={styles.taskInput}
          type="text"
          placeholder="Add a new task..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          className={styles.prioritySelect}
          value={newPriority}
          onChange={e => setNewPriority(e.target.value as Priority)}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <button className={styles.addBtn} onClick={addTask} disabled={!newText.trim()}>
          + Add
        </button>
      </div>

      {/* ── Filter Tabs ── */}
      <div className={styles.filterRow}>
        <div className={styles.filters}>
          {(['all', 'active', 'completed'] as Filter[]).map(f => (
            <button
              key={f}
              className={[styles.filterBtn, filter === f ? styles.filterActive : ''].join(' ')}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className={styles.filterCount}>
                {f === 'all' ? stats.total : f === 'active' ? stats.active : stats.completed}
              </span>
            </button>
          ))}
        </div>
        {stats.completed > 0 && (
          <button className={styles.clearBtn} onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>

      {/* ── Task List ── */}
      <div className={styles.taskList}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>🎉</p>
            <p>{filter === 'completed' ? 'No completed tasks yet.' : 'No active tasks! All done.'}</p>
          </div>
        ) : (
          filtered.map(task => {
            const pc = PRIORITY_CONFIG[task.priority];
            return (
              <div
                key={task.id}
                className={[styles.taskItem, task.done ? styles.taskDone : ''].join(' ')}
              >
                <button
                  className={[styles.checkbox, task.done ? styles.checkboxChecked : ''].join(' ')}
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.done && '✓'}
                </button>

                <div className={styles.taskContent}>
                  <p className={styles.taskText}>{task.text}</p>
                  <span className={styles.taskDate}>{task.createdAt}</span>
                </div>

                <span
                  className={styles.priorityBadge}
                  style={{ color: pc.color, background: pc.bg }}
                >
                  {pc.label}
                </span>

                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TaskManagerDemo;

import React, { useState } from 'react';
import styles from './KanbanBoard.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = 'high' | 'medium' | 'low';
type ColumnId = 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';

interface KanbanCard {
  id:       string;
  title:    string;
  description: string;
  priority: Priority;
  tags:     string[];
  column:   ColumnId;
}

interface ColumnConfig {
  id:     ColumnId;
  label:  string;
  color:  string;
  accent: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLUMNS: ColumnConfig[] = [
  { id: 'backlog',    label: 'Backlog',      color: '#334155', accent: '#64748b' },
  { id: 'todo',      label: 'To Do',        color: '#2e1065', accent: '#7c3aed' },
  { id: 'inprogress',label: 'In Progress',  color: '#431407', accent: '#f59e0b' },
  { id: 'review',    label: 'In Review',    color: '#0c1a4a', accent: '#3b82f6' },
  { id: 'done',      label: 'Done',         color: '#052e16', accent: '#10b981' },
];

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  high:   { label: 'High',   color: '#ef4444', bg: 'rgba(239,68,68,0.15)'   },
  medium: { label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)'  },
  low:    { label: 'Low',    color: '#10b981', bg: 'rgba(16,185,129,0.15)'  },
};

const INITIAL_CARDS: KanbanCard[] = [
  { id: 'c1', column: 'done',       priority: 'high',   title: 'Design System Setup',       description: 'Create base components, tokens, and style guide.', tags: ['Design', 'React']       },
  { id: 'c2', column: 'done',       priority: 'low',    title: 'CI/CD Pipeline',            description: 'Configure GitHub Actions for auto deployment.',     tags: ['DevOps']                },
  { id: 'c3', column: 'inprogress', priority: 'high',   title: 'API Integration',           description: 'Connect REST APIs for products and user modules.',   tags: ['Backend', 'API']        },
  { id: 'c4', column: 'inprogress', priority: 'medium', title: 'Dashboard Analytics',       description: 'Build KPI cards, charts, and transaction table.',    tags: ['Charts', 'UI']          },
  { id: 'c5', column: 'review',     priority: 'high',   title: 'User Authentication',       description: 'JWT auth flow with refresh tokens and session mgmt.', tags: ['Auth', 'Security']     },
  { id: 'c6', column: 'todo',       priority: 'medium', title: 'Mobile Responsiveness',     description: 'Ensure all pages render correctly on mobile screens.', tags: ['CSS', 'Mobile']        },
  { id: 'c7', column: 'todo',       priority: 'low',    title: 'Unit Test Coverage',        description: 'Write Jest + RTL tests to reach 80% code coverage.',  tags: ['Testing', 'Jest']       },
  { id: 'c8', column: 'backlog',    priority: 'medium', title: 'Performance Optimisation',  description: 'Code splitting, lazy loading, and bundle analysis.',   tags: ['Performance']           },
  { id: 'c9', column: 'backlog',    priority: 'low',    title: 'Technical Documentation',   description: 'Write README, API docs, and component storybook.',    tags: ['Docs']                  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const KanbanBoard: React.FC = () => {
  const [cards, setCards]         = useState<KanbanCard[]>(INITIAL_CARDS);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<ColumnId | null>(null);
  const [search, setSearch]       = useState('');
  const [addingTo, setAddingTo]   = useState<ColumnId | null>(null);
  const [newTitle, setNewTitle]   = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [nextId, setNextId]       = useState(INITIAL_CARDS.length + 1);

  // ── Drag handlers ──────────────────────────────────────────────────────── //

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverCol(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: ColumnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(columnId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: ColumnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    setCards(prev => prev.map(card => card.id === id ? { ...card, column: columnId } : card));
    setDraggedId(null);
    setDragOverCol(null);
  };

  // ── Card CRUD ──────────────────────────────────────────────────────────── //

  const addCard = (columnId: ColumnId) => {
    const title = newTitle.trim();
    if (!title) return;
    const newCard: KanbanCard = {
      id: `c${nextId}`,
      title,
      description: '',
      priority: newPriority,
      tags: [],
      column: columnId,
    };
    setCards(prev => [newCard, ...prev]);
    setNextId(n => n + 1);
    setNewTitle('');
    setNewPriority('medium');
    setAddingTo(null);
  };

  const deleteCard = (id: string) =>
    setCards(prev => prev.filter(card => card.id !== id));

  // ── Filtered view ──────────────────────────────────────────────────────── //

  const filteredCards = search.trim()
    ? cards.filter(card => card.title.toLowerCase().includes(search.toLowerCase()))
    : cards;

  const getColumnCards = (columnId: ColumnId) =>
    filteredCards.filter(card => card.column === columnId);

  const totalCards = cards.length;
  const doneCards  = cards.filter(c => c.column === 'done').length;

  return (
    <div className={styles.app}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.appTitle}>🗂️ Project Board</h1>
          <div className={styles.progressInfo}>
            <span>{doneCards}/{totalCards} completed</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${totalCards > 0 ? (doneCards / totalCards) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="🔍 Search cards..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      {/* ── Board ── */}
      <div className={styles.board}>
        {COLUMNS.map(column => {
          const columnCards  = getColumnCards(column.id);
          const isDragTarget = dragOverCol === column.id && draggedId !== null;

          return (
            <div
              key={column.id}
              className={[styles.column, isDragTarget ? styles.columnDragOver : ''].join(' ')}
              onDragOver={e => handleDragOver(e, column.id)}
              onDrop={e => handleDrop(e, column.id)}
              onDragLeave={() => setDragOverCol(null)}
              style={{ '--accent': column.accent, '--col-bg': column.color } as React.CSSProperties}
            >
              {/* Column header */}
              <div className={styles.columnHeader}>
                <div className={styles.columnTitleRow}>
                  <span className={styles.columnDot} style={{ background: column.accent }} />
                  <span className={styles.columnTitle}>{column.label}</span>
                  <span className={styles.columnCount}>{columnCards.length}</span>
                </div>
              </div>

              {/* Cards */}
              <div className={styles.cardList}>
                {columnCards.map(card => {
                  const pc         = PRIORITY_CONFIG[card.priority];
                  const isDragging = draggedId === card.id;
                  return (
                    <div
                      key={card.id}
                      className={[styles.card, isDragging ? styles.cardDragging : ''].join(' ')}
                      draggable
                      onDragStart={e => handleDragStart(e, card.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className={styles.cardTop}>
                        <span
                          className={styles.priorityBadge}
                          style={{ color: pc.color, background: pc.bg }}
                        >
                          {pc.label}
                        </span>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deleteCard(card.id)}
                          aria-label="Delete card"
                        >
                          ×
                        </button>
                      </div>

                      <p className={styles.cardTitle}>{card.title}</p>

                      {card.description && (
                        <p className={styles.cardDescription}>{card.description}</p>
                      )}

                      {card.tags.length > 0 && (
                        <div className={styles.tagRow}>
                          {card.tags.map(tag => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      )}

                      <div className={styles.cardFooter}>
                        <span className={styles.avatar}>PT</span>
                        <span className={styles.dragHint}>⠿ drag</span>
                      </div>
                    </div>
                  );
                })}

                {/* Drop zone placeholder */}
                {isDragTarget && (
                  <div className={styles.dropPlaceholder}>Drop here</div>
                )}
              </div>

              {/* Add card */}
              {addingTo === column.id ? (
                <div className={styles.addForm}>
                  <input
                    autoFocus
                    className={styles.addInput}
                    placeholder="Card title..."
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addCard(column.id); if (e.key === 'Escape') setAddingTo(null); }}
                  />
                  <select
                    className={styles.addSelect}
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as Priority)}
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                  <div className={styles.addActions}>
                    <button className={styles.addConfirm} onClick={() => addCard(column.id)}>Add Card</button>
                    <button className={styles.addCancel} onClick={() => setAddingTo(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className={styles.addCardBtn} onClick={() => setAddingTo(column.id)}>
                  + Add card
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;

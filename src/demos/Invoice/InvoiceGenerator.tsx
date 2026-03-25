import React, { useState, useCallback } from 'react';
import styles from './InvoiceGenerator.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItem {
  id:          string;
  description: string;
  qty:         number;
  rate:        number;
}

interface ClientInfo {
  name:    string;
  email:   string;
  company: string;
  address: string;
}

interface InvoiceMeta {
  number:  string;
  date:    string;
  dueDate: string;
  notes:   string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SENDER = {
  name:    'Prabhu Teja Malli',
  role:    'Frontend Developer',
  email:   'prabhutejamalli@gmail.com',
  phone:   '+91 79978 86006',
  address: 'Hyderabad, Telangana, India',
};

const GST_RATE = 0.18;

const DEFAULT_ITEMS: LineItem[] = [
  { id: 'li-1', description: 'React Frontend Development',    qty: 1, rate: 45000 },
  { id: 'li-2', description: 'UI/UX Design & Prototyping',    qty: 1, rate: 15000 },
  { id: 'li-3', description: 'Deployment & Configuration',    qty: 1, rate: 8000  },
];

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LineItemRowProps {
  item:     LineItem;
  onChange: (id: string, field: keyof LineItem, value: string | number) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
}

const LineItemRow: React.FC<LineItemRowProps> = ({ item, onChange, onDelete, canDelete }) => {
  const amount = item.qty * item.rate;
  return (
    <div className={styles.lineItem}>
      <input
        className={[styles.lineInput, styles.lineDesc].join(' ')}
        value={item.description}
        placeholder="Description"
        onChange={e => onChange(item.id, 'description', e.target.value)}
      />
      <input
        className={[styles.lineInput, styles.lineQty].join(' ')}
        type="number"
        min="1"
        value={item.qty}
        onChange={e => onChange(item.id, 'qty', Math.max(1, Number(e.target.value)))}
      />
      <input
        className={[styles.lineInput, styles.lineRate].join(' ')}
        type="number"
        min="0"
        value={item.rate}
        onChange={e => onChange(item.id, 'rate', Math.max(0, Number(e.target.value)))}
      />
      <span className={styles.lineAmount}>₹{amount.toLocaleString('en-IN')}</span>
      {canDelete && (
        <button className={styles.lineDelete} onClick={() => onDelete(item.id)} aria-label="Remove line item">×</button>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const InvoiceGenerator: React.FC = () => {
  const today  = todayString();
  const due    = addDays(today, 30);

  const [client, setClient] = useState<ClientInfo>({
    name:    '',
    email:   '',
    company: '',
    address: '',
  });

  const [meta, setMeta] = useState<InvoiceMeta>({
    number:  'INV-2024-001',
    date:    today,
    dueDate: due,
    notes:   'Payment due within 30 days. Please transfer to the bank account details provided below.',
  });

  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);
  const [nextId, setNextId] = useState(4);
  const [printed, setPrinted] = useState(false);

  // ── Calculations ────────────────────────────────────────────────────────── //

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const gstAmount = Math.round(subtotal * GST_RATE);
  const total     = subtotal + gstAmount;

  // ── Handlers ────────────────────────────────────────────────────────────── //

  const updateClient = (field: keyof ClientInfo, value: string) =>
    setClient(prev => ({ ...prev, [field]: value }));

  const updateMeta = (field: keyof InvoiceMeta, value: string) =>
    setMeta(prev => ({ ...prev, [field]: value }));

  const updateLineItem = useCallback((id: string, field: keyof LineItem, value: string | number) =>
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item)),
  []);

  const addLineItem = () => {
    setItems(prev => [...prev, { id: `li-${nextId}`, description: '', qty: 1, rate: 0 }]);
    setNextId(n => n + 1);
  };

  const deleteLineItem = useCallback((id: string) =>
    setItems(prev => prev.filter(item => item.id !== id)),
  []);

  const handlePrint = () => {
    setPrinted(true);
    setTimeout(() => {
      window.print();
      setPrinted(false);
    }, 300);
  };

  const handleReset = () => {
    setClient({ name: '', email: '', company: '', address: '' });
    setItems(DEFAULT_ITEMS);
    setMeta({ number: 'INV-2024-001', date: today, dueDate: due, notes: meta.notes });
  };

  return (
    <div className={styles.app}>

      {/* ════════════════ FORM PANEL (left) ════════════════ */}
      <aside className={styles.formPanel}>
        <h2 className={styles.formTitle}>Invoice Details</h2>

        {/* Invoice Meta */}
        <section className={styles.formSection}>
          <h3 className={styles.sectionLabel}>Invoice Info</h3>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>Invoice #</label>
              <input value={meta.number} onChange={e => updateMeta('number', e.target.value)} />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>Invoice Date</label>
              <input type="date" value={meta.date} onChange={e => updateMeta('date', e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Due Date</label>
              <input type="date" value={meta.dueDate} onChange={e => updateMeta('dueDate', e.target.value)} />
            </div>
          </div>
        </section>

        {/* Client Info */}
        <section className={styles.formSection}>
          <h3 className={styles.sectionLabel}>Bill To</h3>
          <div className={styles.field}>
            <label>Client Name</label>
            <input placeholder="John Smith" value={client.name} onChange={e => updateClient('name', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Company</label>
            <input placeholder="Acme Corp" value={client.company} onChange={e => updateClient('company', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="client@example.com" value={client.email} onChange={e => updateClient('email', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Address</label>
            <textarea rows={2} placeholder="City, State, Country" value={client.address} onChange={e => updateClient('address', e.target.value)} />
          </div>
        </section>

        {/* Line Items */}
        <section className={styles.formSection}>
          <h3 className={styles.sectionLabel}>Line Items</h3>
          <div className={styles.lineHeader}>
            <span className={styles.lineDesc}>Description</span>
            <span className={styles.lineQty}>Qty</span>
            <span className={styles.lineRate}>Rate (₹)</span>
            <span className={styles.lineAmount}>Amount</span>
          </div>
          {items.map(item => (
            <LineItemRow
              key={item.id}
              item={item}
              onChange={updateLineItem}
              onDelete={deleteLineItem}
              canDelete={items.length > 1}
            />
          ))}
          <button className={styles.addItemBtn} onClick={addLineItem}>+ Add Line Item</button>
        </section>

        {/* Notes */}
        <section className={styles.formSection}>
          <h3 className={styles.sectionLabel}>Notes</h3>
          <div className={styles.field}>
            <textarea rows={3} value={meta.notes} onChange={e => updateMeta('notes', e.target.value)} />
          </div>
        </section>

        {/* Actions */}
        <div className={styles.formActions}>
          <button className={styles.printBtn} onClick={handlePrint}>
            🖨️ {printed ? 'Opening print…' : 'Print / Download PDF'}
          </button>
          <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </aside>

      {/* ════════════════ INVOICE PREVIEW (right) ════════════════ */}
      <div className={styles.previewWrap}>
        <div className={styles.invoice} id="invoice-preview">

          {/* Invoice Header */}
          <div className={styles.invoiceHeader}>
            <div>
              <div className={styles.invoiceLogo}>PT</div>
              <p className={styles.invoiceSenderName}>{SENDER.name}</p>
              <p className={styles.invoiceSenderRole}>{SENDER.role}</p>
            </div>
            <div className={styles.invoiceHeaderRight}>
              <h1 className={styles.invoiceLabel}>INVOICE</h1>
              <p className={styles.invoiceNumber}>{meta.number || 'INV-2024-001'}</p>
            </div>
          </div>

          {/* Dates */}
          <div className={styles.invoiceDates}>
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>Invoice Date</span>
              <span className={styles.dateValue}>{formatDate(meta.date)}</span>
            </div>
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>Due Date</span>
              <span className={styles.dateValue}>{formatDate(meta.dueDate)}</span>
            </div>
            <div className={[styles.dateItem, styles.dateStatus].join(' ')}>
              <span className={styles.statusPill}>UNPAID</span>
            </div>
          </div>

          {/* From / To */}
          <div className={styles.parties}>
            <div className={styles.party}>
              <p className={styles.partyLabel}>From</p>
              <p className={styles.partyName}>{SENDER.name}</p>
              <p className={styles.partyDetail}>{SENDER.role}</p>
              <p className={styles.partyDetail}>{SENDER.email}</p>
              <p className={styles.partyDetail}>{SENDER.phone}</p>
              <p className={styles.partyDetail}>{SENDER.address}</p>
            </div>
            <div className={styles.party}>
              <p className={styles.partyLabel}>Bill To</p>
              <p className={styles.partyName}>{client.name || 'Client Name'}</p>
              {client.company && <p className={styles.partyDetail}>{client.company}</p>}
              {client.email   && <p className={styles.partyDetail}>{client.email}</p>}
              {client.address && <p className={styles.partyDetail}>{client.address}</p>}
              {!client.name   && <p className={styles.partyPlaceholder}>Fill in client details →</p>}
            </div>
          </div>

          {/* Line Items Table */}
          <table className={styles.invoiceTable}>
            <thead>
              <tr>
                <th className={styles.thDesc}>Description</th>
                <th className={styles.thNum}>Qty</th>
                <th className={styles.thNum}>Rate</th>
                <th className={styles.thNum}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? styles.trEven : ''}>
                  <td>{item.description || <span className={styles.placeholder}>—</span>}</td>
                  <td className={styles.tdNum}>{item.qty}</td>
                  <td className={styles.tdNum}>₹{item.rate.toLocaleString('en-IN')}</td>
                  <td className={styles.tdNum}>₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.totalRow}>
              <span>GST (18%)</span>
              <span>₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className={[styles.totalRow, styles.totalFinal].join(' ')}>
              <span>Total Due</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Notes */}
          {meta.notes && (
            <div className={styles.invoiceNotes}>
              <p className={styles.notesLabel}>Notes</p>
              <p className={styles.notesText}>{meta.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className={styles.invoiceFooter}>
            <p>Thank you for your business! 🙏</p>
            <p>{SENDER.email} · {SENDER.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;

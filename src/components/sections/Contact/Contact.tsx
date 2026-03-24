import React, { useState } from 'react';
import type { ContactData } from '../../../types/portfolio.types';
import RevealOnScroll from '../../ui/RevealOnScroll/RevealOnScroll';
import styles from './Contact.module.css';

interface ContactProps {
  data: ContactData;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens the user's mail client with pre-filled details.
    // To use a form service, replace this with a fetch() call to Formspree/EmailJS.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
    setForm(INITIAL_FORM);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <RevealOnScroll>
          <p className={styles.eyebrow}>Get in touch</p>
          <h2 className={styles.heading}>Let's Work Together</h2>
        </RevealOnScroll>

        <div className={styles.grid}>
          {/* Info */}
          <RevealOnScroll delay={100}>
            <div className={styles.info}>
              <p className={styles.infoText}>
                Whether you need a new web app, want to improve an existing product, or just want to chat
                about a project idea — I'd love to hear from you.
              </p>

              <p className={styles.availability}>{data.availability}</p>

              <div className={styles.contactItems}>
                <a href={`mailto:${data.email}`} className={styles.contactItem}>
                  <span className={styles.contactIcon}>✉️</span>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <p className={styles.contactValue}>{data.email}</p>
                  </div>
                </a>
                <a href={data.github} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  <span className={styles.contactIcon}>🐙</span>
                  <div>
                    <p className={styles.contactLabel}>GitHub</p>
                    <p className={styles.contactValue}>prabhutejamalli</p>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <div>
                    <p className={styles.contactLabel}>Location</p>
                    <p className={styles.contactValue}>{data.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Form */}
          <RevealOnScroll delay={200}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sent' ? '✅ Message Sent!' : 'Send Message →'}
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Contact;

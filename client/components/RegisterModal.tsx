'use client';

import { useState } from 'react';
import styles from './RegisterModal.module.css';
import { registerUser } from '@/services/apiService';

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUser(form);
      alert('Registered successfully!');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name='name'
            placeholder='Name'
            onChange={handleChange}
            required
          />
          <input
            name='email'
            placeholder='Email'
            type='email'
            onChange={handleChange}
            required
          />
          <input
            name='password'
            placeholder='Password'
            type='password'
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
            <button type='submit' disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

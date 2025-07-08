'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import RegisterModal from '@/components/RegisterModal';
import { loginUser } from '@/services/apiService';
import  Cookies  from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      // Not logged in, redirect to login
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      Cookies.set('token', data.token, {
        expires: 7, // days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      router.push('/dashboard');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          className={styles.input}
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttonRow}>
          <button
            type='button'
            onClick={() => setShowModal(true)}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Register
          </button>
          <button type='submit' className={styles.button}>
            Login
          </button>
        </div>
      </form>

      {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
    </main>
  );
}

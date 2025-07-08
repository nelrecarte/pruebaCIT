import { useEffect, useState } from 'react';
import { getUserReservations, deleteReservation } from '@/services/apiService';
import styles from './MyReservations.module.css';

interface Reservation {
  id_reservation: number;
  date: string;
  start_time: string;
  end_time: string;
  Area: {
    name: string;
  };
}

interface Props {
  userId: number;
}

export default function MyReservations({ userId }: Props) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const data = await getUserReservations(userId);
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id_reservation !== id));
    } catch (err) {
      alert('Failed to cancel reservation');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p className={styles.container}>Loading your reservations...</p>;
  if (reservations.length === 0)
    return <p className={styles.container}>You have no reservations.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Reservations</h2>
      <ul>
        {reservations.map((res) => (
          <li key={res.id_reservation} className={styles.reservationItem}>
            <div>
              <strong>{res.Area.name}</strong> – {res.date} from{' '}
              {res.start_time.slice(0, 5)} to {res.end_time.slice(0, 5)}
            </div>
            <button
              onClick={() => handleCancel(res.id_reservation)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

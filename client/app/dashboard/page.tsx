'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import {
  getUserById,
  getAreas,
  getReservationsByAreaAndDate,
  createReservation,
} from '@/services/apiService';

import Cookies from 'js-cookie';
import TimeSlotModal from '@/components/TimeSlotModal';
import MyReservations from '@/components/MyReservations';
import styles from './page.module.css';

interface JwtPayload {
  id_user: number;
}

interface User {
  id_user: number;
  name: string;
  email: string;
}

interface Area {
  id_area: number;
  name: string;
  description: string;
  Category: { name: string };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showReservations, setShowReservations] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return router.replace('/');

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const user_id = decoded.id_user;

      const fetchData = async () => {
        try {
          const [userData, areaData] = await Promise.all([
            getUserById(user_id),
            getAreas(),
          ]);
          setUser(userData);
          setAreas(areaData);
        } catch (err) {
          console.error('Fetch error:', err);
          Cookies.remove('token');
          router.replace('/');
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } catch {
      Cookies.remove('token');
      router.replace('/');
    }
  }, [router]);

  const groupAreasByCategory = (areas: Area[]) => {
    const grouped: { [category: string]: Area[] } = {};
    areas.forEach((area) => {
      const category = area.Category?.name || 'Uncategorized';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(area);
    });
    return grouped;
  };

  const handleAreaClick = async (area: Area) => {
    setSelectedArea(area);
    try {
      const data = await getReservationsByAreaAndDate(
        area.id_area,
        selectedDate
      );
      setReservedSlots(data.map((r: any) => r.start_time.slice(0, 5)));
    } catch (err) {
      console.error('Reservation fetch error:', err);
      setReservedSlots([]);
    }
  };

  const handleReserve = async (time: string) => {
    if (!selectedArea || !user) return;
    const [hour, minute] = time.split(':').map(Number);
    const end_time = `${String(hour + 1).padStart(2, '0')}:${String(
      minute
    ).padStart(2, '0')}:00`;

    try {
      const res = await createReservation({
        id_user: user.id_user,
        id_area: selectedArea.id_area,
        date: selectedDate,
        start_time: `${time}:00`,
        end_time,
      });

      if (res.ok) {
        alert('Reservation successful!');
        setSelectedArea(null);
      } else {
        alert('Failed to reserve.');
      }
    } catch (err) {
      console.error('Reserve failed:', err);
    }
  };

  const groupedAreas = groupAreasByCategory(areas);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  return (
    <main className={styles.container} style={{ backgroundColor: '#f9fafb' }}>
      <div className={styles.headerRow}>
        <h1 className={styles.welcome}>Welcome, {user?.name}!</h1>
        <button
          className={styles.logoutButton}
          onClick={() => {
            Cookies.remove('token');
            router.replace('/');
          }}
        >
          Logout
        </button>
      </div>

      <p className={styles.description}>
        Reserve a spot in your favorite area below.
      </p>

      <label className={styles.dateLabel}>
        <strong>Select a date:</strong>
        <input
          type='date'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </label>

      <h2 className={styles.sectionTitle}>Common Areas Available</h2>

      {Object.entries(groupedAreas).map(([category, categoryAreas]) => (
        <section key={category} className={styles.categorySection}>
          <h3 style={{ color: '#111827' }}>{category}</h3>
          <div className={styles.areaGrid}>
            {categoryAreas.map((area) => (
              <div
                key={area.id_area}
                onClick={() => handleAreaClick(area)}
                className={styles.areaCard}
                style={{
                  backgroundColor: getCategoryColor(area.Category.name),
                }}
              >
                <strong>{area.name}</strong>
                <p style={{ color: '#fff' }}>{area.Category.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {selectedArea && (
        <TimeSlotModal
          areaName={selectedArea.name}
          date={selectedDate}
          reservedSlots={reservedSlots}
          onReserve={handleReserve}
          onClose={() => setSelectedArea(null)}
        />
      )}

      <button
        className={styles.toggleButton}
        onClick={() => setShowReservations((prev) => !prev)}
      >
        {showReservations ? 'Hide My Reservations' : 'Show My Reservations'}
      </button>

      {showReservations && <MyReservations userId={user?.id_user ?? 0} />}
    </main>
  );
}

function getCategoryColor(category?: string): string {
  if (!category) return '#6b7280';
  switch (category.toLowerCase()) {
    case 'deportes':
      return '#3b82f6';
    case 'recreation':
      return '#10b981';
    case 'meeting':
      return '#f59e0b';
    default:
      return '#6b7280';
  }
}

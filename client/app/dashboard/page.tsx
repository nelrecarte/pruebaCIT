'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { getUserById, getAreas } from '@/services/apiService';
import Cookies from 'js-cookie';
import { get } from 'http';
import TimeSlotModal from '@/components/TimeSlotModal';

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
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.replace('/');
      return;
    }

    let user_id: number;
    try {
      //const decoded: JwtPayload = jwtDecode(token);
      const decoded = jwtDecode<JwtPayload>(token);
      user_id = decoded.id_user;
    } catch (err) {
      console.error('Invalid token');
      Cookies.remove('token');
      router.replace('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [userData, areaData] = await Promise.all([
          getUserById(user_id),
          getAreas(),
        ]);

        setUser(userData);
        setAreas(areaData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        Cookies.remove('token');
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      const token = Cookies.get('token');
      const res = await fetch(
        `http://localhost:4000/api/reservations?area_id=${area.id_area}&date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      const takenTimes = data.map((r: any) => r.start_time.slice(0, 5)); // '08:00'

      setReservedSlots(takenTimes);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setReservedSlots([]);
    }
  };

  const handleReserve = async (time: string) => {
    if (!selectedArea || !user) return;
    const token = Cookies.get('token');

    // Calculate end time by adding 1 hour to start_time
    const [hour, minute] = time.split(':').map(Number);
    const endHour = hour + 1;
    const end_time = `${String(endHour).padStart(2, '0')}:${String(
      minute
    ).padStart(2, '0')}:00`;

    try {
      const res = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: user.id_user,
          id_area: selectedArea.id_area,
          date: selectedDate,
          start_time: `${time}:00`,
          end_time,
        }),
      });

      if (res.ok) {
        alert('Reservation successful!');
        setSelectedArea(null); // Close modal
      } else {
        alert('Could not reserve. Try another slot.');
      }
    } catch (err) {
      console.error('Reserve failed', err);
    }
  };

  if (isLoading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  const groupedAreas = groupAreasByCategory(areas);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome, {user?.name}!</h1>

      {/* 📅 Date Picker */}
      <label style={{ display: 'block', marginBottom: '1.5rem' }}>
        <strong>Select a date:</strong>{' '}
        <input
          type='date'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginLeft: '0.5rem',
          }}
          min={new Date().toISOString().split('T')[0]} // ✅ restrict to today and forward
        />
      </label>

      {/* 🔠 Grouped Areas */}
      {Object.entries(groupedAreas).map(([category, categoryAreas]) => (
        <section key={category} style={{ marginBottom: '2rem' }}>
          <h2>{category}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            {categoryAreas.map((area) => (
              <div
                key={area.id_area}
                onClick={() => handleAreaClick(area)}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: getCategoryColor(area.Category.name),
                  color: 'white',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
              >
                <strong>{area.name}</strong>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  {area.Category.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 🕑 Modal */}
      {selectedArea && (
        <TimeSlotModal
          areaName={selectedArea.name}
          date={selectedDate}
          reservedSlots={reservedSlots}
          onReserve={handleReserve}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </main>
  );

  function getCategoryColor(category?: string): string {
    if (!category) return '#6b7280'; // default gray if category is missing

    switch (category.toLowerCase()) {
      case 'deportes':
        return '#3b82f6'; // blue
      case 'recreation':
        return '#10b981'; // green
      case 'meeting':
        return '#f59e0b'; // yellow
      default:
        return '#6b7280'; // gray
    }
  }
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { getUserById, getAreas } from '@/services/apiService';
import Cookies from 'js-cookie';
import { get } from 'http';

interface JwtPayload {
  id_user: number;
}

interface User {
  id: number;
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

  const handleAreaClick = (area: Area) => {
    console.log('Clicked area:', area);
    // In next step, show modal with available time slots
  };

  if (isLoading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  const groupedAreas = groupAreasByCategory(areas);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome, {user?.name}!</h1>

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
                onClick={() => handleAreaClick(area)} // ⬅️ next step: open modal
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
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{area.Category.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );

  function getCategoryColor(category?: string): string {
    if (!category) return '#6b7280'; // default gray if category is missing

    switch (category.toLowerCase()) {
      case 'Deportes':
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

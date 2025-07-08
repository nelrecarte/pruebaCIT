import Cookies from 'js-cookie';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json(); 
};

export const getUserById = async (userId: number) => {
  const token = Cookies.get('token');
  if (!token) throw new Error('No auth token found');

  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'User not found');
  }

  return response.json(); 
};


export const getAreas = async () => {
  const token = Cookies.get('token');
  if (!token) throw new Error('No auth token found');

  const response = await fetch(`${API_BASE_URL}/api/areas`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch areas');
  }

  return response.json();
};

export const getUserReservations = async (userId: number) => {
  const token = Cookies.get('token');

  const res = await fetch(`${API_BASE_URL}/api/reservations?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch reservations');
  return res.json();
};

export const deleteReservation = async (reservationId: number) => {
  const token = Cookies.get('token');

  const res = await fetch(`${API_BASE_URL}/api/reservations/${reservationId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete reservation');
};

export async function getReservationsByAreaAndDate(areaId: number, date: string) {
  const token = Cookies.get('token');
  const res = await fetch(`${API_BASE_URL}/reservations?area_id=${areaId}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function createReservation(payload: {
  id_user: number;
  id_area: number;
  date: string;
  start_time: string;
  end_time: string;
}) {
  const token = Cookies.get('token');
  const res = await fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res;
}
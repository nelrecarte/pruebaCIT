'use client';

import React from 'react';
import styles from './TimeSlotModal.module.css';

interface TimeSlotModalProps {
  areaName: string;
  date: string;
  reservedSlots: string[]; // e.g. ['08:00', '10:00']
  onReserve: (time: string) => void;
  onClose: () => void;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({ areaName, date, reservedSlots, onReserve, onClose }) => {
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{areaName} – {date}</h2>
        <div className={styles.grid}>
          {timeSlots.map((time) => {
            const isReserved = reservedSlots.includes(time);
            return (
              <button
                key={time}
                disabled={isReserved}
                className={isReserved ? styles.reserved : styles.slot}
                onClick={() => onReserve(time)}
              >
                {time}
              </button>
            );
          })}
        </div>
        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
};

export default TimeSlotModal;

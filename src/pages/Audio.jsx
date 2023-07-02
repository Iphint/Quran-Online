import React, { useState } from 'react';

const Audio = () => {
  const [reminderTime, setReminderTime] = useState('');

  const handleSetReminder = () => {
    if (reminderTime) {
      const [hours, minutes] = reminderTime.split(':');
      const reminderDate = new Date();
      reminderDate.setHours(hours, minutes, 0, 0);

      if ('Notification' in window && window.Notification.permission === 'granted') {
        scheduleNotification(reminderDate);
      } else if ('Notification' in window && window.Notification.permission !== 'denied') {
        window.Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            scheduleNotification(reminderDate);
          }
        });
      } else {
        console.log('Notifications are not supported in this browser.');
      }
    }
  };

  const scheduleNotification = (date) => {
    const now = new Date();
    const timeUntilNotification = date.getTime() - now.getTime();

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        new window.Notification('Quran Reminder', {
          body: 'Reminder: Time to read the Quran!',
          icon: 'https://cdn-icons-png.flaticon.com/128/2645/2645897.png',
        });
      }, timeUntilNotification);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Reminder</h1>
      <input
        type="time" 
        value={reminderTime}
        onChange={(event) => setReminderTime(event.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />
      <button
        onClick={handleSetReminder}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        set
      </button>
    </div>
  );
};

export default Audio;
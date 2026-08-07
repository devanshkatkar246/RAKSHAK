import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { NotificationCard } from '../components/ui/NotificationCard';
import { GradientButton } from '../components/ui/GradientButton';
import { CheckCheck } from 'lucide-react';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_01',
      title: 'Morning Vitals Sync Successful',
      message: 'Heart rate (72 BPM) and SpO2 (98%) are within healthy baseline parameters.',
      time: '08:30 AM',
      type: 'system' as const,
      group: 'Today',
    },
    {
      id: 'notif_02',
      title: 'Medication Taken On Time',
      message: 'Amlodipine Besylate 5 mg dose logged successfully.',
      time: '08:05 AM',
      type: 'medication' as const,
      group: 'Today',
    },
    {
      id: 'notif_03',
      title: 'Afternoon Dose Scheduled',
      message: 'Metformin HCl 500 mg is scheduled for 01:30 PM.',
      time: 'Yesterday',
      type: 'medication' as const,
      group: 'Yesterday',
    },
    {
      id: 'notif_04',
      title: 'Weekly Health Summary Digest Ready',
      message: 'Your 7-day vitals report has been compiled and shared with Rajesh Sharma.',
      time: '2 days ago',
      type: 'system' as const,
      group: 'This Week',
    },
  ]);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    // Keep notification cards, mark as read
  };

  const groups = ['Today', 'Yesterday', 'This Week'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-geist">
      <SectionHeader
        title="Notifications Inbox"
        subtitle="Real-time alerts, medication reminders, and automated system updates."
        action={
          <GradientButton variant="glass" size="sm" leftIcon={<CheckCheck className="w-4 h-4" />} onClick={handleMarkAllRead}>
            Mark All Read
          </GradientButton>
        }
      />

      {groups.map((group) => {
        const groupNotifs = notifications.filter((n) => n.group === group);
        if (groupNotifs.length === 0) return null;

        return (
          <div key={group} className="space-y-3">
            <h3 className="text-xs font-semibold text-mid-gray uppercase tracking-caption px-1">
              {group}
            </h3>
            <div className="space-y-2.5">
              {groupNotifs.map((n) => (
                <NotificationCard
                  key={n.id}
                  id={n.id}
                  title={n.title}
                  message={n.message}
                  time={n.time}
                  type={n.type}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;

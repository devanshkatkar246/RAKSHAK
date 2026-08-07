import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedProgressRing } from '../components/ui/AnimatedProgressRing';
import { GradientButton } from '../components/ui/GradientButton';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useMedicationStore } from '../store/medicationStore';
import { Pill, Check, Clock, Plus, AlertCircle } from 'lucide-react';

export const Medications: React.FC = () => {
  const { schedule, markAsTaken, markAsSkipped } = useMedicationStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-geist">
      <SectionHeader
        title="Medication Dashboard"
        subtitle="Schedule tracking, adherence scoring, and automated prescription refill reminders."
        action={
          <GradientButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Medication
          </GradientButton>
        }
      />

      {/* Adherence Hero Card */}
      <GlassCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <AnimatedProgressRing
            progress={schedule.todayAdherenceRate}
            size={110}
            strokeWidth={8}
            color="primary"
            subLabel="Adherence"
          />
          <div>
            <h3 className="text-xl font-semibold text-ink tracking-tight">Today's Dose Adherence</h3>
            <p className="text-sm text-mid-gray mt-1 leading-relaxed">
              1 out of 3 scheduled doses taken today. Next pill is due at 01:30 PM.
            </p>
          </div>
        </div>

        {schedule.nextDose && (
          <div className="p-4 rounded-cards bg-canvas border border-hairline text-left sm:text-right w-full sm:w-auto">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-caption">Up Next</span>
            <p className="text-base font-semibold text-ink mt-0.5">{schedule.nextDose.name}</p>
            <p className="text-xs text-mid-gray mt-0.5">{schedule.nextDose.scheduledTime} • {schedule.nextDose.dosage}</p>
          </div>
        )}
      </GlassCard>

      {/* Low Stock Refill Alert Banner */}
      <div className="p-3.5 rounded-cards bg-canvas border border-hairline flex items-center justify-between gap-3 text-xs text-ink">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-ink shrink-0 stroke-[1.75]" />
          <span className="font-medium">Refill Alert:</span>
          <span className="text-mid-gray">Metformin HCl has 14 pills remaining (7 days supply).</span>
        </div>
        <button className="font-semibold text-ink hover:underline shrink-0">Order Refill</button>
      </div>

      {/* Medications List */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-ink">Today's Prescription Schedule</h3>
        {schedule.medications.map((med) => (
          <GlassCard key={med.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-buttons bg-canvas border border-hairline flex items-center justify-center text-ink shrink-0">
                <Pill className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-ink">{med.name}</h4>
                  <StatusBadge
                    status={med.status === 'taken' ? 'optimal' : 'pending'}
                    label={med.status === 'taken' ? 'Taken' : 'Pending'}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-mid-gray mt-0.5">
                  {med.dosage} • {med.frequency} • <Clock className="inline w-3 h-3 ml-0.5" /> {med.scheduledTime}
                </p>
                <p className="text-xs text-mid-gray mt-1">{med.instructions}</p>
              </div>
            </div>

            {med.status === 'pending' && (
              <div className="flex items-center gap-2 shrink-0">
                <GradientButton
                  variant="primary"
                  size="sm"
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                  onClick={() => markAsTaken(med.id)}
                >
                  Log Dose Taken
                </GradientButton>
                <GradientButton variant="ghost" size="sm" onClick={() => markAsSkipped(med.id)}>
                  Skip
                </GradientButton>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Medications;

export function generateTimeSlots(availableSlots: string[]): string[] {
  // Simply return the available slots as they are already in the correct format
  return availableSlots;
}

export function getNextThreeDays(availableDays: string[]): { date: Date; label: string }[] {
  const days: { date: Date; label: string }[] = [];
  const today = new Date();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  let i = 0;
  while (days.length < 3) {
    const date = new Date(today);
    date.setDate(today.getDate() + i++);
    const dayName = weekdays[date.getDay()];
    
    // Skip if not an available day
    if (!availableDays.includes(dayName)) {
      continue;
    }

    let label = '';
    if (date.getDate() === today.getDate()) label = 'Today';
    else if (date.getDate() === today.getDate() + 1) label = 'Tomorrow';
    else {
      label = date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    
    days.push({ date, label });
  }
  
  return days;
}
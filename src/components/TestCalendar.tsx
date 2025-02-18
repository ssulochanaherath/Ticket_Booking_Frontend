// TestCalendar.tsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles

const TestCalendar: React.FC = () => {
    const [date, setDate] = useState<Date | Date[]>(new Date());

    const handleDateChange = (newDate: Date | Date[]) => {
        setDate(newDate);
    };

    return (
        <div className="calendar-wrapper">
            <Calendar onChange={handleDateChange} value={date} />
        </div>
    );
};

export default TestCalendar;

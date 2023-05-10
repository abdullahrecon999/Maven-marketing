import { useState } from 'react';
import { Calendar, Modal } from 'antd';
import moment from 'moment';

export function MyCalendar() {
    const [currentDate, setCurrentDate] = useState();

    const handleTodayClick = () => {
      setCurrentDate();
    };
  
    const renderExtraFooter = () => {
      return (
        <Button type="primary" onClick={handleTodayClick}>
          Today
        </Button>
      );
    };

    return (
        <div className='p-2'>
            {/* <Calendar /> */}
            <Calendar />
        </div>
    );
}

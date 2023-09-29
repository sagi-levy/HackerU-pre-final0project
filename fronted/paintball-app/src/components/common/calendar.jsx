import React, { useEffect, useState } from "react";
import "../../../src/App.css"; // Import your custom CSS for styling
import { getAllCardsNotBiz } from "../../services/cardsServices";

const Calendar = () => {
  const [activityCardsList, setActivityCardsList] = useState([]);
  console.log(activityCardsList);
  useEffect(() => {
    const getActivityCards = async () => {
      const activityCards = await getAllCardsNotBiz();

      setActivityCardsList(activityCards.data);
    };

    getActivityCards();
  }, []);
  const [date, setDate] = useState(new Date());

  const getDaysInMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
  };

  const getFirstDayOfWeek = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1);
    setDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfWeek = getFirstDayOfWeek();
    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div key={day} className="day">
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-days">
        <div className="day-label">{activityCardsList[0].activityName}</div>
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;

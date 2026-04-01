import { useState, useEffect } from "react";

function EventCarousel({ events }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!events || events.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [events]);

  if (!events || events.length === 0) return null;

  const event = events[index];

  return (
    <div className="carousel-card">
      <h3>{event.title}</h3>
      <p>{event.date} – {event.location}</p>
      <p>{event.description}</p>
    </div>
  );
}

export default EventCarousel;
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/events.json')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <section className="section">
      <h1>Events</h1>

      {events.length === 0 && <p>No events available right now.</p>}

      <div className="events-grid">
        {events.map(e => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}

export default Events;
function EventCard({ event, onRegister }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p className="muted">{event.date} – {event.location}</p>
      <p>{event.description}</p>
      {onRegister && (
        <button onClick={() => onRegister(event.id)}>Register</button>
      )}
    </div>
  );
}

export default EventCard;
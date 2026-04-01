function EventMap({ location }) {
  const query = encodeURIComponent(location || "Hamburg, Germany");

  return (
    <div className="map-wrapper">
      <iframe
        title="Event Location"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
      />
    </div>
  );
}

export default EventMap;
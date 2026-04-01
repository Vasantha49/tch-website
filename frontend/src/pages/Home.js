import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";

import Hero from "../components/Hero";
import EventCarousel from "../components/EventCarousel";
import CategoryFilter from "../components/CategoryFilter";
import NewsSection from "../components/NewsSection";
import CulturalSpotlight from "../components/CulturalSpotlight";
import KidsCorner from "../components/KidsCorner";
import VideoHighlights from "../components/VideoHighlights";
import EventMap from "../components/EventMap";
import JoinCommunity from "../components/JoinCommunity";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sorted);
        setFilteredEvents(sorted);
        setFeatured(sorted[0]);
      });
  }, []);

  useEffect(() => {
    if (!featured) return;

    const interval = setInterval(() => {
      const eventDate = new Date(featured.date);
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        setCountdown("Happening now!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days} days, ${hours} hours, ${minutes} minutes`);
    }, 1000);

    return () => clearInterval(interval);
  }, [featured]);

  async function register(eventId) {
    if (!token) {
      alert("Please log in to register");
      return;
    }

    const res = await apiPost("/events/register", { eventId }, token);
    alert(res.message);
  }

  return (
    <div>
      <Hero />

      {featured && (
        <section className="section" id="events">
          <h2>Featured Event</h2>

          <div className="featured-card">
            <h3>{featured.title}</h3>
            <p>{featured.date} – {featured.location}</p>
            <p>{featured.description}</p>

            <p className="countdown">Starts in: {countdown}</p>

            <div className="featured-actions">
              <button onClick={() => register(featured.id)}>
                Register Now
              </button>
              <a
                className="outline-button"
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  featured.title
                )}&details=${encodeURIComponent(
                  featured.description || ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Add to Google Calendar
              </a>
            </div>
          </div>
        </section>
      )}

      {events.length > 1 && (
        <section className="section">
          <h2>Highlights</h2>
          <EventCarousel events={events} />
        </section>
      )}

      <section className="section">
        <h2>Browse by Category</h2>
        <CategoryFilter events={events} onFilter={setFilteredEvents} />
      </section>

      <section className="section">
        <h2>Upcoming Events</h2>

        {filteredEvents.length === 0 && <p>No events found.</p>}

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={register}
            />
          ))}
        </div>

        <div className="center">
          <a href="/events" className="hero-button">View All Events</a>
        </div>
      </section>

      <section className="section" id="news">
        <h2>News & Announcements</h2>
        <NewsSection />
      </section>

      <section className="section" id="cultural">
        <h2>Cultural Spotlight</h2>
        <CulturalSpotlight />
      </section>

      <section className="section">
        <h2>Video Highlights</h2>
        <VideoHighlights />
      </section>

      <section className="section" id="kids">
        <h2>Kids Corner</h2>
        <KidsCorner />
      </section>

      {featured && (
        <section className="section">
          <h2>Event Location</h2>
          <EventMap location={featured.location} />
        </section>
      )}

      <JoinCommunity />

      <section className="section" id="contact">
        <h2>Contact Us</h2>
        <p>Email: info@tch-community.de</p>
        <p>Follow us on social media for updates.</p>
      </section>
    </div>
  );
}

export default Home;
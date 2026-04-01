import { useState } from "react";
import { apiPost } from "../api";

function AdminEvents() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: ""
  });

  if (!user || user.role !== "admin") {
    return <h1 className="section">Not authorized</h1>;
  }

  async function createEvent() {
    const res = await apiPost("/events/create", form, token);
    alert(res.message);

    setForm({
      title: "",
      date: "",
      location: "",
      description: ""
    });
  }

  return (
    <div className="section">
      <h1>Create Event</h1>

      <input
        placeholder="Event Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button onClick={createEvent}>Create Event</button>
    </div>
  );
}

export default AdminEvents;
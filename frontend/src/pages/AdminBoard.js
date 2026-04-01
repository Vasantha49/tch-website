import { useEffect, useState } from "react";

function AdminBoard() {
  const [data, setData] = useState({ current: [], former: [] });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/data/board.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  function update(section, index, field, value) {
    const updated = { ...data };
    updated[section][index][field] = value;
    setData(updated);
  }

  async function save() {
    const res = await fetch("/api/save-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: "board", data }),
    });

    setStatus(await res.text());
  }

  return (
    <div className="section">
      <h2>Admin: Edit Board Members</h2>

      <h3>Current Board</h3>
      {data.current.map((m, i) => (
        <div key={i} className="admin-card">
          {Object.keys(m).map((key) => (
            <input
              key={key}
              value={m[key]}
              onChange={(e) => update("current", i, key, e.target.value)}
            />
          ))}
        </div>
      ))}

      <h3>Former Board</h3>
      {data.former.map((m, i) => (
        <div key={i} className="admin-card">
          {Object.keys(m).map((key) => (
            <input
              key={key}
              value={m[key]}
              onChange={(e) => update("former", i, key, e.target.value)}
            />
          ))}
        </div>
      ))}

      <button onClick={save}>Save Changes</button>
      <p>{status}</p>
    </div>
  );
}

export default AdminBoard;
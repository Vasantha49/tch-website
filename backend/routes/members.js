import { useEffect, useState } from "react";

function Members() {
  const [data, setData] = useState({
    current: [],
    former: [],
    advisory: [],
    volunteers: [],
    honorary: [],
    history: []
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/data/board.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="section">
      <h2>Board Members of Telugu Community Germany e.V.</h2>
      <p className="muted">Elected governing body for the term 2024–2027</p>

      {/* Current Board */}
      <h3>Current Board</h3>
      <div className="board-grid">
        {data.current.map((m) => (
          <div key={m.id} className="board-card fade-in" onClick={() => setSelected(m)}>
            <img src={m.photo} alt={m.name} className="board-photo" />
            <h3>{m.name}</h3>
            <p className="role">{m.role}</p>
            <p className="term">{m.term}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      {/* Advisory Committee */}
      <h3>Advisory Committee</h3>
      <div className="board-grid">
        {data.advisory.map((m) => (
          <div key={m.id} className="board-card slide-up" onClick={() => setSelected(m)}>
            <img src={m.photo} alt={m.name} className="board-photo" />
            <h4>{m.name}</h4>
            <p className="role">{m.role}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      {/* Volunteers */}
      <h3>Volunteers</h3>
      <div className="board-grid">
        {data.volunteers.map((m) => (
          <div key={m.id} className="board-card fade-in" onClick={() => setSelected(m)}>
            <img src={m.photo} alt={m.name} className="board-photo" />
            <h4>{m.name}</h4>
            <p className="role">{m.role}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      {/* Honorary Members */}
      <h3>Honorary Members</h3>
      <div className="board-grid">
        {data.honorary.map((m) => (
          <div key={m.id} className="board-card slide-up" onClick={() => setSelected(m)}>
            <img src={m.photo} alt={m.name} className="board-photo" />
            <h4>{m.name}</h4>
            <p className="role">{m.role}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      {/* Former Board */}
      <h3>Former Board Members</h3>
      <div className="board-grid">
        {data.former.map((m) => (
          <div key={m.id} className="board-card fade-in">
            <img src={m.photo} alt={m.name} className="board-photo" />
            <h4>{m.name}</h4>
            <p className="role">{m.role}</p>
            <p className="term">{m.term}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      {/* Board History Timeline */}
      <h3>Board History</h3>
      <ul className="timeline">
        {data.history.map((h, i) => (
          <li key={i}>
            <strong>{h.year}</strong> — {h.event}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>

            <img src={selected.photo} alt={selected.name} className="modal-photo" />
            <h2>{selected.name}</h2>
            <p className="role">{selected.role}</p>
            {selected.term && <p className="term">{selected.term}</p>}
            {selected.bio && <p className="bio">{selected.bio}</p>}

            {selected.email && (
              <p className="email">
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;
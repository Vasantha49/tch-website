import { useEffect, useState } from "react";

function CulturalSpotlight() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data/cultural.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="cards-grid cultural-grid">
      {items.map((item) => (
        <div key={item.id} className="info-card cultural-card">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default CulturalSpotlight;
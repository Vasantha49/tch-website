import { useEffect, useState } from "react";

function KidsCorner() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data/kids.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="cards-grid kids-grid">
      {items.map((item) => (
        <div key={item.id} className="info-card kids-card">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default KidsCorner;
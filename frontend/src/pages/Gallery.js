import { useEffect, useState } from 'react';

function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="section">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {items.map(item => (
          <div key={item.id} className="gallery-item">
            <div className="gallery-placeholder">
              {/* Replace with <img src={item.imageUrl} alt={item.title} /> when you host images */}
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
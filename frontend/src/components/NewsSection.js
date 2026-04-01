import { useEffect, useState } from "react";

function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div className="cards-grid">
      {news.map((item) => (
        <div key={item.id} className="info-card">
          <h3>{item.title}</h3>
          <p className="muted">{item.date}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsSection;
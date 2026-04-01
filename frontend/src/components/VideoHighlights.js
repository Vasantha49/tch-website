import { useEffect, useState } from "react";

function VideoHighlights() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/data/videos.json")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="video-grid">
      {videos.map((v) => (
        <div key={v.id} className="video-card">
          <div className="video-wrapper">
            <iframe
              src={v.url}
              title={v.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p>{v.title}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoHighlights;
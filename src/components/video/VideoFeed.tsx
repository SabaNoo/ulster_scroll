import { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

const SAMPLE_VIDEOS = [
  {
    id: 1,
    title: "Amazing Sunset at the Beach",
    videoId: "m51owrJeXos",
  },
  {
    id: 2,
    title: "City Life in Tokyo",
    videoId: "1rTAmGOQAFY",
  },
  {
    id: 3,
    title: "Mountain Climbing Adventure",
    videoId: "dcDR9DGcWMs",
  },
  {
    id: 4,
    title: "Urban Exploration",
    videoId: "XQqHVD3FNiU",
  },
  {
    id: 5,
    title: "Nature Documentary",
    videoId: "ijN8l-3oWQM",
  },
  {
    id: 6,
    title: "Travel Adventures",
    videoId: "q9U7Z2al3C8",
  },
  {
    id: 7,
    title: "Wildlife Discovery",
    videoId: "HxZsZichYCk",
  }
];

export const VideoFeed = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRefs = useRef<{ [key: number]: any }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      if (index !== currentVideo) {
        // Pause previous video
        if (playerRefs.current[currentVideo]) {
          playerRefs.current[currentVideo].pauseVideo();
        }
        // Play new video
        if (playerRefs.current[index]) {
          playerRefs.current[index].playVideo();
        }
        setCurrentVideo(index);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentVideo]);

  const onReady = (event: any, index: number) => {
    playerRefs.current[index] = event.target;
    if (index === currentVideo) {
      event.target.playVideo();
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      loop: 1,
      mute: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div ref={containerRef} className="video-scroll-container">
      {SAMPLE_VIDEOS.map((video, index) => (
        <div key={video.id} className="video-item">
          <div className="w-full h-full bg-black">
            <YouTube
              videoId={video.videoId}
              opts={opts}
              onReady={(event) => onReady(event, index)}
              className="w-full h-full"
            />
          </div>
          <div className="video-overlay">
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
import React, { useRef, useEffect } from "react";
import SearchBox from "./SearchBox";
import Auth from "./Auth";

import bg from './../image/IMG_0939.MP4';
import "./../css/style.css";

function Home() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4; // Adjust the value as needed
    }
  }, []);

  return (
    <div className="hero">
      <video ref={videoRef} className="video-bg" autoPlay loop muted>
        <source src={bg} type='video/mp4' />
      </video>
      <div className="content">
        <div className="w-full h-screen"  style={{ backgroundColor: 'rgba(15, 17, 20, 0.2)' }}>
          <div className="md:mx-auto py-4">
            <div className="flex justify-end gap-4">
              <Auth />
            </div>
          </div>
          <div className="container max-w-4xl md:mx-auto h-10">
            <div className="h-screen mx-5 relative">
              <div className="absolute inset-x-0 top-0 flex flex-col h-screen overflow-hidden">
                <h1
                  className="pt-48 text-4xl text-white font-semibold mb-4 text-center"
                  style={{ fontWeight: "bold", letterSpacing: "8px" }}
                >
                  IMAGIFY
                </h1>
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

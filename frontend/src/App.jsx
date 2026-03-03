import React, { useState, useEffect, useRef } from 'react';
import { Camera, Settings, History, BookOpen, User, Pause, Image as ImageIcon } from 'lucide-react';
import './index.css';


const ASLRecognizer = () => {
  const [currentSign, setCurrentSign] = useState("HELLO");
  const [confidence, setConfidence] = useState(97);
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    }
  }, []);

  return (
    <div className="asl-container">
      {/* Top Navigation */}
      <header className="asl-header">
        <div className="brand">
          <h1 className="title">ASL Sign Recognizer</h1>
          <p className="subtitle">(American Sign Language)</p>
        </div>
        <div className="header-actions">
          <span className="live-tag">LIVE RECOGNITION</span>
          <div className="icon-group">
            <Settings className="icon" />
            <User className="icon" />
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="asl-main">
        <div className="video-viewport">
          <video ref={videoRef} autoPlay muted className="camera-feed" />

          {/* Recognition Overlay */}
          <div className="overlay-content">
            <div className="prediction-badge">
              <h2 className="sign-text">{currentSign}</h2>
            </div>
            
            <div className="confidence-container">
              <div className="confidence-bar" style={{ width: `${confidence}%` }}></div>
              <span className="confidence-label">{confidence}% Match</span>
            </div>

            {/* Hand Tracking Frame */}
            <div className="tracking-box">
              <div className="corner tl" />
              <div className="corner br" />
            </div>
          </div>

          <div className="status-indicator">
            <div className="pulse-dot" />
            <span>RECOGNIZING...</span>
          </div>
        </div>

        {/* Control Bar */}
        <div className="controls">
          <button className="control-btn secondary">
            <Pause />
            <span>Pause</span>
          </button>

          <button className="record-btn">
            <div className="record-inner" />
          </button>

          <button className="control-btn secondary">
            <ImageIcon />
            <span>Gallery</span>
          </button>
        </div>

        <div className="recent-history">
          <span>Recent:</span>
          <span className="history-item highlight">[THANK YOU (8s ago)]</span>
          <span className="history-item">[YES (15s ago)]</span>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="asl-footer">
        <nav className="bottom-nav">
          <div className="nav-item active"><Camera size={20}/> <span>Home</span></div>
          <div className="nav-item"><BookOpen size={20}/> <span>Dictionary</span></div>
          <div className="nav-item"><History size={20}/> <span>History</span></div>
          <div className="nav-item"><BookOpen size={20}/> <span>Learn</span></div>
        </nav>
      </footer>
    </div>
  );
};

export default ASLRecognizer;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideos([...videos, { name: file.name, url: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookmark = (video) => {
    if (!bookmarkedVideos.some((v) => v.name === video.name)) {
      setBookmarkedVideos([...bookmarkedVideos, video]);
    }
  };

  const handleDelete = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleBookmarkFilter = () => {
    setShowBookmarkedOnly(!showBookmarkedOnly);
  };

  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="App">
      <h1 className="heading">Video Library</h1>
      <label htmlFor="upload" className="uploadButton">
        <i className="fas fa-plus"></i> Add Video
      </label>
      <input type="file" accept="video/*" id="upload" onChange={handleVideoUpload} style={{ display: 'none' }} />
      <br />
      <button className="bookmarkButton" onClick={handleBookmarkFilter}>
        {showBookmarkedOnly ? 'Show All' : 'Show Bookmarked Only'}
      </button>
      <div className="videoList">
        {(showBookmarkedOnly ? bookmarkedVideos : videos).map((video, index) => (
          <div className="videoItem" key={index}>
            <span>{video.name}</span>
            <button className="playButton" onClick={() => playVideo(video)}>Play</button>
            <button className="bookmarkButton" onClick={() => handleBookmark(video)}>Bookmark</button>
            <button className="deleteButton" onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="videoPopup">
          <div className="videoContainer">
            <video className="videoPlayer" controls autoPlay>
              <source src={selectedVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="closeButton" onClick={closeVideo}><i className="fas fa-times"></i></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

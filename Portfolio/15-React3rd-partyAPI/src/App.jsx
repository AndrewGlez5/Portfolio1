import React, { useState } from 'react';
import './AppStyles.css';
import FilmCard from './Components/FilmCard'; 
import ProfileDetails from './Components/ProfileDetails'; 
import starWarsData from './data/data.js'; 

const MainApp = () => {
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [feedback, setFeedback] = useState({}); 

  const handleFeedback = (episode, newFeedback) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [episode]: [...(prevFeedback[episode] || []), newFeedback],
    }));
  };

  const toggleDetails = (movie) => {
    setSelectedMovie((prevMovie) => 
      prevMovie?.episode === movie.episode ? null : movie
    );
  };

  const groupedMovies = [];
  for (let i = 0; i < starWarsData.length; i += 2) {
    groupedMovies.push(starWarsData.slice(i, i + 2));
  }

  return (
    <main className="page-container">
      {groupedMovies.map((group, groupIndex) => (
        <div className="movie-row row gy-4 justify-content-center" key={groupIndex}>
          {group.map((movie) => (
            <React.Fragment key={movie.episode}>
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <FilmCard
                  movie={movie}
                  onToggle={() => toggleDetails(movie)}
                  expanded={selectedMovie?.episode === movie.episode}
                />
              </div>

              {selectedMovie?.episode === movie.episode && (
                <div className="col-12">
                  <ProfileDetails
                    characterInfo={selectedMovie.best_character}
                    feedback={feedback[selectedMovie.episode] || []}
                    handleFeedback={(newFeedback) => 
                      handleFeedback(selectedMovie.episode, newFeedback)
                    }
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </main>
  );
};

export default MainApp;

import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap'; 
import './CardStyles.css'; 

const MovieInfoCard = ({ details, toggleExpand, expandedView }) => {
  const [hoverState, setHoverState] = useState(false);
  const [votes, setVotes] = useState({ up: 0, down: 0 });

  const handleHover = (state) => setHoverState(state);

  const affiliationBorderStyle = details.best_character.affiliation === 'Sith' || details.best_character.affiliation === 'Empire'
    ? { border: '2px solid #d9534f' }
    : { border: '2px solid #0275d8' };

  const displayedImage = hoverState
    ? `${process.env.PUBLIC_URL}/${details.best_character.affiliation}.png`
    : `${process.env.PUBLIC_URL}/${details.poster}`;

  const adjustVotes = (type) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  return (
    <Card
      className={`movie-info-card ${hoverState ? 'card-highlight' : ''}`}
      style={affiliationBorderStyle}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="image-container">
        <Card.Img
          className="responsive-card-image"
          src={displayedImage}
          alt={`Image of ${details.title}`}
        />
      </div>

      <Card.Body className="card-content">
        <div className="title-section">
          <h5 className="movie-title">{details.title}</h5>
          <p className="movie-year">{details.year}</p>
        </div>

        <div className="actions-section">
          <Button
            variant="secondary"
            className="toggle-button"
            onClick={toggleExpand}
          >
            {expandedView ? 'Collapse' : 'Expand'}
          </Button>

          <div className="vote-buttons">
            <Button
              className="vote-button upvote"
              onClick={() => adjustVotes('up')}
            >
              👍 {votes.up}
            </Button>
            <Button
              className="vote-button downvote"
              onClick={() => adjustVotes('down')}
            >
              👎 {votes.down}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieInfoCard;

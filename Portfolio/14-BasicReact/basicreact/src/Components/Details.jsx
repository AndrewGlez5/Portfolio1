import React from 'react';
import { Card } from 'react-bootstrap';
import FeedbackSection from './Feedback'; 
import './ProfileStyles.css'; 

const ProfileDetails = ({ characterInfo, feedback, handleFeedback }) => {
  if (!characterInfo) return null;

  const affiliationClass = characterInfo.affiliation === 'Sith' || characterInfo.affiliation === 'Empire' 
    ? 'affiliation-danger' 
    : 'affiliation-primary';

  return (
    <section className="character-info-wrapper">
      <Card className="character-profile-card text-light">
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <Card.Img
            src={`${process.env.PUBLIC_URL}/${characterInfo.image}`}
            alt={`Image of ${characterInfo.name}`}
            className="profile-image"
          />
          <Card.Body>
            <h2 className="profile-name">{characterInfo.name}</h2>
            <h5 className={`${affiliationClass} mb-3`}>{characterInfo.affiliation}</h5>
            <p className="profile-description">{characterInfo.bio}</p>
          </Card.Body>
        </div>
      </Card>

      <FeedbackSection feedbackList={feedback} addFeedback={handleFeedback} />
    </section>
  );
};

export default ProfileDetails;

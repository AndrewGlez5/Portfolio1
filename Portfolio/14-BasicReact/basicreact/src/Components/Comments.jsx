import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; 
import './FeedbackStyles.css'; 

const FeedbackSection = ({ feedbackList, addFeedback }) => {
  const [feedback, setFeedback] = useState({ username: '', message: '' });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFeedback((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFeedback = () => {
    if (feedback.username && feedback.message) {
      addFeedback(feedback);
      setFeedback({ username: '', message: '' });
    }
  };

  return (
    <section className="feedback-container p-3 my-4 rounded">
      <h4 className="feedback-header">User Feedback</h4>
      <div className="feedback-list">
        {feedbackList.map((item, idx) => (
          <div key={idx} className="feedback-item mb-3">
            <strong>{item.username}</strong>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
      <Form className="feedback-form">
        <Form.Group className="mb-3" controlId="feedbackName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            name="username"
            value={feedback.username}
            onChange={handleInput}
            className="feedback-input"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="feedbackMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Share your feedback"
            name="message"
            value={feedback.message}
            onChange={handleInput}
            className="feedback-input"
          />
        </Form.Group>

        <Button
          variant="info"
          onClick={submitFeedback}
          className="feedback-submit-btn"
        >
          Submit Feedback
        </Button>
      </Form>
    </section>
  );
};

export default FeedbackSection;

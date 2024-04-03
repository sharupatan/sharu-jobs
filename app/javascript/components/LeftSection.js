import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const LeftSection = () => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>My Jobs</ListGroup.Item>
      <ListGroup.Item>Resume bUilder</ListGroup.Item>
      <ListGroup.Item>Interview Prep</ListGroup.Item>
      <ListGroup.Item>Job Seeker Guidance</ListGroup.Item>
      <ListGroup.Item>Application Settings</ListGroup.Item>
    </ListGroup>
  );
}

export default LeftSection;
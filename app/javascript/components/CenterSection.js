import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

const CenterSection = () => {
  return (
    <>
      <Form.Control type="text" id="posttext" className="mb-3" placeholder="Start typing a post ..."/>
      <Stack direction="horizontal" className="d-flex justify-content-around">
        <Button>Media</Button>
        <Button>Event</Button>
        <Button>Article</Button>
      </Stack>
    </>
  );
};

export default CenterSection;

import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const news = [
  { title: "The 10 Best Ways To Keep Looking Young", time: "1h ago" },
  { title: "Unlock the Power of Micro-Habits", time: "1h ago" },
  { title: "The Surprising Benefits of Eating Mushrooms", time: "1h ago" },
  { title: "Why Sleep Is the Key to Success at Work", time: "1h ago" },
  { title: "The Shocking Truth About Amazon", time: "1h ago" },
  { title: "How Drinking Water Can Help You Stay Slim", time: "1h ago" },
  {
    title: "You Won't Believe What Happened When We Drank This",
    time: "1h ago",
  },
  {
    title: "How I Generated $300,000 in 6 months with My Etsy Store",
    time: "1h ago",
  },
  { title: "Discover the Secret to Toned Abs", time: "1h ago" },
  { title: "Unlock the Power of Micro-Habits", time: "1h ago" },
  {
    title: "The 5 Most Common Relationship Errors and How To Solve Them",
    time: "1h ago",
  },
  { title: "Unlock the Power of Micro-Habits", time: "1h ago" },
];

const RightSection = () => {
  return (
    <div>
      <h4 className="text-center">News</h4>
      <ListGroup variant="flush" as="ol" numbered>
        {news.map((item) => (
          <ListGroup.Item as="li">{item.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RightSection;

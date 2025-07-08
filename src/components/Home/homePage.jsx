import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        "Bible Verse" - But seek ye first the kingdom of God, and his
        righteousness; and all these things shall be added unto you.
      </div>

      <img
        src="/Capstone-2025-Dominic/IMG/37784_Open_bible-scaled.jpg"
        alt="bible"
        className="bible-img"
      ></img>

      <div className="linebreak">
        {" "}
        <span>Over Sea's Works</span>
      </div>
      <div className="oversea-works">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/Capstone-2025-Dominic/IMG/Screenshot 2025-05-09 123829.png"
          />
          <Card.Body>
            <Card.Title>Hope Of Gaza</Card.Title>
            <Card.Text>
              Children's Home in One of the most War torn areas.{" "}
              <em>
                "How do you change a generations Thinking? 'You' start with the
                children.
              </em>
              "
            </Card.Text>
            <Button as={Link} to="https://hopeofgaza.org/" variant="primary">
              Visit Website
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="oversea-works">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/Capstone-2025-Dominic/IMG/Screenshot 2025-05-06 142151.png" />
          <Card.Body>
            <Card.Title>UPCI Global Missions</Card.Title>
            <Card.Text>
              United Pentecostal Church International{" "}
              <em>The Whole Gospel, To the Whole World</em>
            </Card.Text>
            <Button
              as={Link}
              to="https://www.globalmissions.com/"
              variant="primary"
            >
              Visit Website
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="button-support">
        <Button variant="primary" as={Link} to="/support" >Support Those Who are Sent!</Button>
      </div>
    </div>
  );
};

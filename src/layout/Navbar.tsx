import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function Navbar() {
  return (
    <div>
      <p>This is Navbar Component</p>

      <Button>
        <Link to="/">Home</Link>
      </Button>
      <Button>
        <Link to="/about">About</Link>
      </Button>
    </div>
  );
}

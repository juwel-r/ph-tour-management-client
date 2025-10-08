import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Cancel() {
  return (
    <div>This is Cancel Component
      <Button><Link to="/">Go to Home</Link></Button>

    </div>
  )
}
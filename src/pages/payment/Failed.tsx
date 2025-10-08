import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Failed() {
  return (
    <div>This is Failed Component
      <Button><Link to="/">Go to Home</Link></Button>

    </div>
  )
}
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Success() {
  return (
    <div>This is Success Component
      <Button><Link to="/">Go to Home</Link></Button>
    </div>
  )
}
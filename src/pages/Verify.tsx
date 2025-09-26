import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const location = useLocation();
  const [email] = useState(location.state);
  const navigate = useNavigate();

  console.log(email);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);
  return <div>This is Verify Component</div>;
}

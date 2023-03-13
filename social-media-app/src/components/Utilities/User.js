 import { useEffect, useState } from "react";  
 const User = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [token]);
}

export default User


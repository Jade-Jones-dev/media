import  { useEffect, } from "react";

const Logout = () => {
  
    useEffect(() => {
        window.localStorage.clear();
        window.location = "/";
    }, []);
    return null;
};

export default Logout;

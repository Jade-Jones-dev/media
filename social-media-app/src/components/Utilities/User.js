// import jwt_decode from "jsonwebtoken";


export const User = () => {
    const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  else{
return false
  }
}


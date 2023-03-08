

const User = () => {
    const token = localStorage.getItem("token"); // replace "myToken" with the name of your token
  if (token) {
    return true;
  } else {
    return false;
  }
}


export default User



const IsAdmin = () => {
    const token = localStorage.getItem("isAdmin"); 
    if (token === true) {
      return true;
    } else {
      return false;
    }
}

export default IsAdmin
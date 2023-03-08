import React from 'react'

const IsAdmin = () => {
    const token = localStorage.getItem("IsAdmin"); // replace "myToken" with the name of your token
    if (token === true) {
      return true;
    } else {
      return false;
    }
}

export default IsAdmin
// Validation functions
const validateFullName = (fullName) => {
    const regex = /^[A-Za-z]+(?: [A-Za-z'-.]+)?$/;
    return regex.test(fullName);
  };
  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_-]{3,16}$/;
    return regex.test(username);
  };
  
  const validatePassword = (password) => {
    return password.trim().length >= 6 ? true : false;
  };
  
  export { validateFullName, validateEmail, validateUsername, validatePassword };
  
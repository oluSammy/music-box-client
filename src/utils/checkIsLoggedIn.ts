export const checkIsLoggedIn = () => {
  const user = localStorage.getItem('musicApiUser');

  if (!user) return false;

  const today = new Date();
  const expiryDate = new Date(JSON.parse(user).expiryDate);

  // console.log(expiryDate - today);

  if (today > expiryDate) {
    console.log('expired');
    localStorage.removeItem('musicApiUser');
    return false;
  } else {
    console.log('alive');
  }

  return true;
};

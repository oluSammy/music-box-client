export const checkIsLoggedIn = () => {
  const user = localStorage.getItem('musicApiUser');

  if (!user) return false;

  const today = new Date();
  const expiryDate = new Date(JSON.parse(user).expiryDate);

  if (today > expiryDate) {
    localStorage.removeItem('musicApiUser');
    return false;
  } else {
  }

  return true;
};

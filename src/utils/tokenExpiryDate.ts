// sets token expiry date to 20
export const setTokenExpiryDate = () => {
  const today = new Date();
  return today.setDate(today.getDate() + 20);
};

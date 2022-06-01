export const getID = async () => {
  const res = await fetch('https://geolocation-db.com/json/');
  const data = await res.json();
  return data;
};

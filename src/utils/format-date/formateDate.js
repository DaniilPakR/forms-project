export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}, ${day} ${month}, ${hours}:${minutes}`;
};
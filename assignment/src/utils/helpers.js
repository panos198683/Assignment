export function formatDate(dateStr) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = months[monthIndex];
  return `${day} ${monthName} ${year}`;
}

export function generateMockToken(user) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < user.length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
export function formatEmail(email){
  const formatted_Email = email.replace(/(?<=.).(?=.*@)/g, '*');
  return formatted_Email;;
}

export function hideEmail(email) {
  const [username, domain] = email.split('@');
  const maskedUsername = `${username.charAt(0)}${'*'.repeat(username.length - 2)}${username.charAt(username.length - 1)}`;
  return `${maskedUsername}@${domain}`;
}

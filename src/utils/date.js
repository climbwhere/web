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
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDateString = (date) =>
  `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()} `;

export const getTimeString = (date) => {
  return date.toLocaleString("en-SG", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    minute12: true,
  });
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

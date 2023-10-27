const ObjectId = require("mongodb").ObjectId;

const idToDate = (objectId) => {
  // Get the timestamp from the ObjectId
  const timestamp = new ObjectId(objectId).getTimestamp();

  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Create a formatter for the date
  const formatter = new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the date
  const formattedDate = formatter.format(date);

  // Return the formatted date
  return formattedDate;
};

module.exports = { idToDate };

// Functions.js

export function formatFirestoreTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
    const formattedDate = date.toLocaleString(); // Format the date and time
    return formattedDate;
  }
  
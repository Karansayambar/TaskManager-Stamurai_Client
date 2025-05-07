export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "No due date";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid date";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

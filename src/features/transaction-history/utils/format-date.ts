/**
 * Util to format JS date into nice format.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat | Reference: MDN - Intl.DateTimeFormat}
 */
export const formatDate = (date: Date) => {
  const formatDate = new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return formatDate.format(date);
};

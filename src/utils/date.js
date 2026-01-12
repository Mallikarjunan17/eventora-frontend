export function formatACFDate(acfDate) {
  if (!acfDate) return "—";

  // ACF format: DD/MM/YYYY
  const [day, month, year] = acfDate.split("/");

  if (!day || !month || !year) return acfDate;

  const date = new Date(`${year}-${month}-${day}`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

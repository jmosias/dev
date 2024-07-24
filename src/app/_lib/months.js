/**
 * Convert months to a string representation of years and months.
 * @param {number} months - The number of months.
 * @returns {string} - The formatted string (e.g., "1 year 4 months").
 */

export function convertMonthsToString(months) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let result = "";

  if (years > 0) {
    result += `${years} ${years > 1 ? "years" : "year"}`;
  }

  if (remainingMonths > 0) {
    if (years > 0) {
      result += " ";
    }
    result += `${remainingMonths} ${remainingMonths > 1 ? "months" : "month"}`;
  }

  return result || "no experience";
}

/**
 * Find the highest number of months from the given data array.
 * @param {Array} data - The array of objects containing experience data.
 * @returns {number} - The highest number of months.
 */
export function findHighestMonths(data) {
  let maxMonths = 0;

  data.forEach((item) => {
    const proExpMonths = parseInt(item.pro_exp_months, 10);
    const personalExpMonths = parseInt(item.personal_exp_months, 10);

    if (proExpMonths > maxMonths) {
      maxMonths = proExpMonths;
    }

    if (personalExpMonths > maxMonths) {
      maxMonths = personalExpMonths;
    }
  });

  return maxMonths;
}

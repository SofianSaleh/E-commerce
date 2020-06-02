module.exports = pagesLimits = (page, limit) => {
  let pages = page !== undefined && page !== 0 ? page : 1;

  // the limit of items per page
  const limits = limit !== undefined && limit !== 0 ? limit : 10;

  let startValue;
  let endValue;

  if (pages > 0) {
    startValue = pages * limits - limits;
    endValue = pages * limits;
  } else {
    startValue = 0;
    endValue = 10;
  }
  return { startValue, endValue };
};

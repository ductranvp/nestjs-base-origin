export function addDate(date, number) {
  const oneDay = 24 * 60 * 60 * 1000;
  const d = new Date(date);
  d.setTime(d.getTime() + number * oneDay);
  return d;
}

export function subtractDate(date, number) {
  const oneDay = 24 * 60 * 60 * 1000;
  const d = new Date(date);
  d.setTime(d.getTime() - number * oneDay);
  return d;
}

export function setDayStart(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function setDayEnd(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function getWeekStart(date) {
  if (!date || !(date instanceof Date)) date = new Date();

  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

  const startOfWeek = new Date(date.setDate(diff));
  return setDayStart(startOfWeek);
}

export function getWeekEnd(date) {
  const startOfWeek = getWeekStart(date);
  const endOfWeek = addDate(startOfWeek, 6);
  return setDayEnd(endOfWeek);
}

export function getMonthStart(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  return setDayStart(startOfMonth);
}

export function getMonthEnd(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return setDayEnd(endOfMonth);
}

export function getYearStart(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  return setDayStart(startOfYear);
}

export function getYearEnd(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const endOfYear = new Date(date.getFullYear(), 11, 31);
  return setDayEnd(endOfYear);
}

export function getWeekRange(date) {
  return [getWeekStart(date), getWeekEnd(date)];
}

export function getMonthRange(date) {
  return [getMonthStart(date), getMonthEnd(date)];
}

export function getQuarterStart(quarter, date) {
  if (!date || !(date instanceof Date)) date = new Date();
  const startOfQuarter = new Date(date.getFullYear(), quarter * 3, 1);
  return setDayStart(startOfQuarter);
}

export function getQuarterEnd(quarter, date) {
  const startOfQuarter = getQuarterStart(quarter, date);
  const endOfQuarter = new Date(
    startOfQuarter.getFullYear(),
    startOfQuarter.getMonth() + 3,
    0,
  );
  return setDayEnd(endOfQuarter);
}

export function getQuarterFromDate(date) {
  if (!date || !(date instanceof Date)) date = new Date();
  return Math.floor(date.getMonth() / 3);
}

export function getQuarterStartFromDate(date) {
  const quarter = getQuarterFromDate(date);
  return getQuarterStart(quarter, date);
}

export function getQuarterEndFromDate(date) {
  const quarter = getQuarterFromDate(date);
  return getQuarterEnd(quarter, date);
}

export function getQuarterRange(quarter, date) {
  return [getQuarterStart(quarter, date), getQuarterEnd(quarter, date)];
}

export function getQuarterRangeFromYear(quarter, year) {
  const date = new Date(`${year}-01-01`);
  return [getQuarterStart(quarter, date), getQuarterEnd(quarter, date)];
}

export function getYearRange(date) {
  return [getYearStart(date), getYearEnd(date)];
}

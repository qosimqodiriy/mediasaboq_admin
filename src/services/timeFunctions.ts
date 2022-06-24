export function epoch(date: string) {
  return Date.parse(date)
}

export function date(date: number) {
  return new Date(date).toLocaleDateString('en-US')
}

export function inputDate(date: number | string):string {
  const newDate = new Date(date)
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  let dMonth, dDay;
  if (month < 9) {
    dMonth = `0${month + 1}`
  } else {
    dMonth = month + 1
  }

  if (day < 10) {
    dDay = `0${day}`
  } else {
    dDay = day
  }
  return `${year}-${dMonth}-${dDay}`
}
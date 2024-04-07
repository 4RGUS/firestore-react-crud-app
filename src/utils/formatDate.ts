import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Timestamp) => {
  const dateFromTimeStamp = date.toDate();
  const yyyy = dateFromTimeStamp.getFullYear();
  let mm: number | string = dateFromTimeStamp.getMonth() + 1; // Months start at 0!
  let dd: number | string = dateFromTimeStamp.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

export const createTimeStamp = (dateString: string|Date) => {
    const newDate =typeof dateString==="string"? new Date(dateString):dateString;
    return Timestamp.fromDate(newDate);
}

import * as moment from "moment-timezone";

export const timeFormat = (
  timeString,
  timeZone = "Asia/Kuala_Lumpur",
  format = "DD-MM-YYYY, h:mm:ss a"
) => {
  return moment(timeString).tz(timeZone).format(format);
};

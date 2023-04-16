import * as moment from "moment-timezone";

export const timeFormat = (timeString, timeZone = "Asia/Kuala_Lumpur", format = "DD-MM-YYYY, h:mm:ss a") => {
    return moment(timeString).tz(timeZone).format(format);
};

export const dbFilterDateFormat = (date: string) => {
    const range = date.split(",");
    return {
        $gte: moment(range[0]).toDate(),
        $lte: moment(range[1]).toDate(),
    };
};

import * as moment from "moment";

export const MongoRegex = (value: string) => ({
  $regex: new RegExp(value, "i"),
});

export const MongoDateRange = (dates: string) => {
  const date = dates.split(",");
  return {
    $gte: moment(date[0]).startOf("day").toDate(),
    $lte: moment(date[1]).endOf("day").toDate(),
  };
};

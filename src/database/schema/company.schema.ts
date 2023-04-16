import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      default: null,
    },
    deletedAt: {
      type: Schema.Types.Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const CompanySchema = schema;

export interface ICompany {
  _id: any;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

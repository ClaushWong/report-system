import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { ICompany } from "./company.schema";

const schema = new mongoose.Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            default: null,
        },
        date: {
            type: Schema.Types.Date,
            default: null,
        },
        amount: {
            type: Schema.Types.Number,
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

export const DataEntrySchema = schema;

export interface IDataEntry {
    _id: any;
    company: string | ICompany;
    date: Date;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

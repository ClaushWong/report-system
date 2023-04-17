import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: Schema.Types.String,
            default: null,
        },
        type: {
            type: Schema.Types.String,
            default: null,
        },
        allowedPages: [
            {
                type: Schema.Types.String,
                default: null,
            },
        ],
        allowedPermissions: [
            {
                type: Schema.Types.String,
                default: null,
            },
        ],
        deletedAt: {
            type: Schema.Types.Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const RoleSchema = schema;

export interface IRole {
    _id: any;
    name: string;
    type: string;
    allowedPages: string[];
    allowedPermissions: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

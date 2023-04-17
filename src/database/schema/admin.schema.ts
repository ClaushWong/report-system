import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import * as bcrypt from "bcryptjs";
import { IRole } from "./role.schema";

const schema = new mongoose.Schema(
    {
        username: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        name: Schema.Types.String,
        isDisabled: {
            type: Schema.Types.Boolean,
            default: false,
        },
        type: {
            type: Schema.Types.String,
            default: null,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            default: null,
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
            default: null,
        },
        createdBy: {
            userId: { type: Schema.Types.String },
            name: { type: Schema.Types.String },
            type: { type: Schema.Types.String },
        },
        updatedBy: {
            userId: { type: Schema.Types.String },
            name: { type: Schema.Types.String },
            type: { type: Schema.Types.String },
        },
        deletedBy: {
            userId: { type: Schema.Types.String },
            name: { type: Schema.Types.String },
            type: { type: Schema.Types.String },
        },
        deletedAt: { type: Schema.Types.Date, default: null },
        password: {
            type: Schema.Types.String,
            default: null,
        },
        isSearchable: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.set("password", await bcrypt.hash(this.get("password"), 10));
        }
        return next();
    } catch (error) {
        return next(error);
    }
});

export const AdminSchema = schema;

export interface IAdmin {
    _id: any;
    username: string;
    password: string;
    name: string;
    type: string;
    isDisabled: boolean;
    isSearchable: boolean;
    role: string | IRole;
    parent: string | IAdmin;
    createdBy: any;
    updatedBy: any;
    deletedBy: any;
    deletedAt: Date;
}

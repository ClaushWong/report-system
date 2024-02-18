import { Schema } from "mongoose";

export const TYPES = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  OBJECTID: "objectId",
  DATE: "date",
  MIXED: "mixed",
};

export class Type<T = any> {
  constructor(protected _schema: any) {
    this.ref = this.ref.bind(this);
    this.default = this.default.bind(this);
    this.required = this.required.bind(this);
    this.unique = this.unique.bind(this);
    this.notSelected = this.notSelected.bind(this);
    this.enum = this.enum.bind(this);
    this.lowercase = this.lowercase.bind(this);
    this.get = this.get.bind(this);
  }

  ref(value: string) {
    return new Type<T>({
      ...this._schema,
      ref: value,
    });
  }

  default(value: any) {
    return new Type({
      ...this._schema,
      default: value,
    });
  }

  required() {
    return new Type<T>({
      ...this._schema,
      required: true,
    });
  }

  unique() {
    return new Type<T>({
      ...this._schema,
      unique: true,
    });
  }

  notSelected() {
    return new Type<T>({
      ...this._schema,
      select: false,
    });
  }

  enum(values: T[]) {
    return new Type<T>({
      ...this._schema,
      enum: values,
    });
  }

  lowercase() {
    return new Type<T>({
      ...this._schema,
      lowercase: true,
    });
  }

  get() {
    return this._schema;
  }

  static String = {
    type: Schema.Types.String,
    default: null,
  };

  static string() {
    return new Type<String>(Type.String);
  }

  static Number = {
    type: Schema.Types.Number,
    default: 0,
  };

  static number() {
    return new Type<Number>(Type.Number);
  }

  static BooleanTrue = {
    type: Schema.Types.Boolean,
    default: true,
  };

  static BooleanFalse = {
    type: Schema.Types.Boolean,
    default: false,
  };

  static boolean() {
    return new Type<Boolean>(Type.BooleanFalse);
  }

  static Date = {
    type: Schema.Types.Date,
    default: null,
  };

  static date() {
    return new Type<Date>(Type.Date);
  }

  static ObjectId = (ref?: string) =>
    ref
      ? {
          type: Schema.Types.ObjectId,
          ref,
          default: null,
        }
      : {
          type: Schema.Types.ObjectId,
          default: null,
        };

  static objectId() {
    return new Type(Type.ObjectId());
  }

  static Mixed = {
    type: Schema.Types.Mixed,
    default: null,
  };

  static mixed() {
    return new Type(Type.Mixed);
  }
}

export const UserRecord = {
  userId: Type.String,
  name: Type.String,
  type: Type.String,
};

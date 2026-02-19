import mongoose, { Schema, Document } from "mongoose";

export interface IAdminUserDoc extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminUserSchema = new Schema<IAdminUserDoc>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser ||
  mongoose.model<IAdminUserDoc>("AdminUser", AdminUserSchema);

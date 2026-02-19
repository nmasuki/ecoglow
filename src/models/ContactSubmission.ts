import mongoose, { Schema, Document } from "mongoose";

export interface IContactSubmissionDoc extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
}

const ContactSubmissionSchema = new Schema<IContactSubmissionDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmissionDoc>(
    "ContactSubmission",
    ContactSubmissionSchema
  );

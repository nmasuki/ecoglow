import mongoose, { Schema, Document } from "mongoose";

export interface ICategoryDoc extends Document {
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  order: number;
}

const CategorySchema = new Schema<ICategoryDoc>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    accentColor: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategoryDoc>("Category", CategorySchema);

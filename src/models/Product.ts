import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  brandLine: string;
  subtitle: string;
  category: Types.ObjectId;
  purpose: string;
  howToUse: string;
  features: string[];
  images: string[];
  size: string;
  isActive: boolean;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    brandLine: { type: String, required: true },
    subtitle: { type: String, default: "" },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    purpose: { type: String, required: true },
    howToUse: { type: String, required: true },
    features: [{ type: String }],
    images: [{ type: String }],
    size: { type: String, default: "5 Litres" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProductDoc>("Product", ProductSchema);

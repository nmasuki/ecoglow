import mongoose, { Schema, Document } from "mongoose";

export interface ISeoSettingsDoc extends Document {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  metaKeywords: string;
}

const SeoSettingsSchema = new Schema<ISeoSettingsDoc>(
  {
    siteTitle: { type: String, default: "EcoGlow Soap Solutions" },
    siteDescription: {
      type: String,
      default:
        "EcoGlow Soap Solutions is a leading manufacturer of high-quality, eco-friendly cleaning and hygiene products in Kenya.",
    },
    ogImage: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.SeoSettings ||
  mongoose.model<ISeoSettingsDoc>("SeoSettings", SeoSettingsSchema);

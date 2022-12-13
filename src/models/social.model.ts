import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { SocialSchema };

const SocialModel = mongoose.models.Social || mongoose.model("Social", SocialSchema);

export default SocialModel;

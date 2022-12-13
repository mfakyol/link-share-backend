import mongoose from "mongoose";

const StyleSchema = new mongoose.Schema({
  backgroundColor: {
    type: String,
    default: "",
  },

  backgroundType: {
    type: String,
    default: "",
  },

  avatar: {
    type: String,
    default: "",
  },

  avatarType: {
    type: String,
    default: "",
  },

  fontFamily: {
    type: String,
    default: "",
  },

  fontColor: {
    type: String,
    default: "",
  },

  link: {
    style: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    backgroundColor: {
      type: String,
      default: "",
    },

    borderColor: {
      type: String,
      default: "",
    },

    shadowColor: {
      type: String,
      default: "",
    },
  },
});

export { StyleSchema };

const StyleModel = mongoose.models.Style || mongoose.model("Style", StyleSchema);

export default StyleModel;

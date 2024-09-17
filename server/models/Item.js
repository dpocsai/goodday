const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    rules: {
      bad: {
        type: String,
        default: "",
      },
      ok: {
        type: String,
        default: "",
      },
      good: {
        type: String,
        default: "",
      },
    },
    scores: {
      type: Map,
      of: Number, // This makes the Map's values numbers
      default: {}, // Default to an empty object if no scores are provided
    },
    dateCreated: { type: Date },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  }
);
module.exports = mongoose.model("Item", itemSchema);

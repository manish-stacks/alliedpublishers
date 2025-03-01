// const mongoose = require('mongoose');

// // Schema Definition
// const specializedAgencySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   keyFeatures: [String],
//   partnerOrganizations: [String],
//   currentAssociates: [String],
//   contactDetails: {
//     manager: { type: String },
//     address: { type: String },
//     phone: { type: String },
//     mobile: { type: String },
//     email: [String]
//   }
// }, {
//   collection: 'SpecAgency'  // Explicitly define collection name
// });

// // Model Export
// module.exports = mongoose.model('SpecializedAgency', specializedAgencySchema);


const mongoose = require("mongoose");

// Schema Definition
const specializedAgencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    keyFeatures: [String],
    partnerOrganizations: [String],
    currentAssociates: [String],
    contactDetails: {
      manager: { type: String },
      address: { type: String },
      phone: { type: String },
      mobile: { type: String },
      email: [String],
    },
  },
  {
    collection: "SpecAgency", // Explicit Collection Name
  }
);

// Model Export
module.exports = mongoose.model("SpecializedAgency", specializedAgencySchema);

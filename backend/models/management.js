// const mongoose = require("mongoose");

// const ManagementSchema = new mongoose.Schema(
//   {
//     board_of_directors: [
//       {
//         name: String,
//         position: String
//       }
//     ],
//     branches: [
//       {
//         city: String,
//         members: [
//           {
//             name: String,
//             position: String,
//             phone: String
//           }
//         ]
//       }
//     ]
//   },
//   { collection: "management" }
// );

// module.exports = mongoose.model("Management", ManagementSchema, "management");


const mongoose = require("mongoose");

const ManagementSchema = new mongoose.Schema(
  {
    board_of_directors: [
      {
        name: String,
        position: String,
      },
    ],
    branches: [
      {
        city: String,
        members: [
          {
            name: String,
            position: String,
            phone: String,
          },
        ],
      },
    ],
  },
  { collection: "management" }
);

module.exports = mongoose.model("Management", ManagementSchema);

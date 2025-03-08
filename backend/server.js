// const express = require("express");
// const cors = require("cors");  // Already installed
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// // Routes Import
// const homeRoutes = require("./routes/homeRoutes");
// const authRoutes = require("./routes/authRoutes");

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express App
// const app = express();

// // CORS middleware setup - allow frontend to access the backend
// app.use(cors({
//   origin: "http://localhost:3000", // Allow requests from your frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
//   credentials: true                // Allow cookies if required
// }));

// app.use(express.json());

// // Sample Route (Home)
// app.get("/", (req, res) => {
//   res.send("Backend is Running!");
// });

// // API Routes
// app.use("/api/home", homeRoutes);
// app.use("/api/auth", authRoutes); 


// const newAgency = new Agency({
//   title: "Allied Publishers Subscription Agency",
//   description: "Founded in 1974, Allied Publishers Subscription Agency (APSA) is today the largest subscription agent in India. We service the information needs of Indian Subscribers through worldwide Journals and Academic/Scientific Literature—whether in print or electronic format.",
//   services: [
//     "Journals and E-Books from Leading International Publishers",
//     "Electronic Information Products, Standards, and Special/Technical Publications",
//     "Gateway to all the leading online information providers (Online journals, Full text & Abstract databases, CDROM Products)"
//   ],
//   specialServices: [
//     "Proven Credibility",
//     "Access to current pricing information for all journals",
//     "No service charges – Publishers’ actual prices charged",
//     "Speedy processing of orders through computerized operations",
//     "Blanket permit by RBI to obtain drafts & issue of cheques",
//     "Arrangements through Woodland Group (USA) and Woodland Group (UK) to ensure faster delivery of journal issues on publication at no extra charge",
//     "Automatic generation of claim letters for gaps-in-receipt of journal issues",
//     "Automatic renewal notices to plan budgets"
//   ],
//   journalsAndMagazines: {
//     generalInfo: "We work closely with 65,000 publishers worldwide to continuously update the subscription information in our 260,000 titles-strong database.",
//     strategies: [
//       "Direct Mail marketing",
//       "Mailing of specimen copies on request",
//       "Special promotional calls by sales representatives"
//     ],
//     authorizedPublishers: [
//       "Elsevier", "Wiley", "Bentham", "Proquest", "Emerald", "TMH", "Springer"
//     ]
//   },
//   branches: [
//     {
//       city: "Noida",
//       contactPerson: "Mr. R.N. Purwar",
//       address: "D-5, Sector-2, Noida-201301",
//       phone: "9810114020 / 0120-4352866",
//       email: ["rnpurwar@alliedpublishers.com", "delhi.journals@alliedpublishers.com"]
//     },
//     {
//       city: "Mumbai",
//       contactPerson: "Mr. A. George",
//       address: "1st Floor Dubash House, 15 J.N. Heredia Marg, Ballard Estate, Mumbai-400 001",
//       phone: "9820181716 / (022) 4212 6969/30/31",
//       email: ["ageorge@alliedpublishers.com", "mumbai.journals@alliedpublishers.com"]
//     },
//     {
//       city: "Chennai",
//       contactPerson: "Mr. L. Vasanth",
//       address: "25/10, Commander in Chief Road, Ethiraj Lane, Egmore, Chennai-600 008",
//       phone: "9849527263 / (044) 28215235",
//       email: ["vasant@alliedpublishers.com", "chennai.journals@alliedpublishers.com"]
//     }
//   ]
// });

// // Save the new Agency to the database
// newAgency.save()
//   .then(() => {
//     console.log("Data inserted successfully!");
//     mongoose.connection.close();  // Close the connection after the insertion
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//     mongoose.connection.close();  // Close the connection on error
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require("express");
const cors = require("cors");  // Already installed
const dotenv = require("dotenv");
const connectDB = require("./config/db");


// Routes Import
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// CORS middleware setup - allow frontend to access the backend
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
  credentials: true                // Allow cookies if required
}));

app.use(express.json());

// Sample Route (Home)
app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes); 



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



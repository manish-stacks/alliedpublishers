import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/Home/Home";
import DistributionPage from "./components/Distribution/DistributionPage";
import SpecializedAgencies from "./components/SpecializedAgencies/SpecializedAgencies";
import ExportDPage from "./components/ExportDivision/ExportDivison";
import ContactPage from "./components/Contact/ContactPage";
import ConfPrec from "./components/ConfPrec/ConfPrec";
import AboutUsPage from "./components/AboutUsPage/AboutUsPage";
import Management from "./components/Management/management";
import BooksPage from "./components/Books/Book";
import AllAuthors from "./components/AllAuthors/AllAuthors";
import AdminAboutUs from "./components/Admin/AdminAboutus";
import AdminLocation from "./components/Admin/AdminLocation";
import AdminBestseller from "./components/Admin/AdminBestseller";
import AdminAuthor from "./components/Admin/AdminAuthor";
import AdminConference from "./components/Admin/AdminConference";
import AdminContact from "./components/Admin/AdminContact";
import AdminExportInfo from "./components/Admin/AdminExportInfo";
import AdminManagement from "./components/Admin/AdminManagement";
import AdminPublisher from "./components/Admin/AdminPublisher";
import AdminSpecialAgency from "./components/Admin/AdminSpecialAgency";
import JournalPage from "./components/Journal/JournalPage";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import GeneralTiles from "./components/GeneralTiles/GeneralTiles"; 
import ConfPrecBooks from "./components/ConfPrecBooks/ConfPrecBooks";
import SearchResults from "./components/SearchResult";
import SearchResultsPage from "./components/SearchResultsPage";
import AdminUpdateImage from "./components/Admin/AdminUpdateImage";
import AdminJournal from "./components/Admin/AdminJournal";
import AddressDetail from "./components/Address/AddressDetail";
// import AdminDashboard from "./components/Admin/AdminDashboard";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment";
import AdminPayment from "./components/Admin/AdminOrders";
import ViewOrder from "./components/ViewOrder";
import OrderStatus from "./components/OrderStatus";
import AdminDeliveryCharges from "./components/Admin/AdminDeliveryCharges";

function App() {

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publisher" element={<DistributionPage />} />
        <Route path="/special-agency" element={<SpecializedAgencies />} />
        <Route path="/export-info" element={<ExportDPage />} />
        <Route path="/conference" element={<ConfPrec />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/management" element={<Management />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/all-authors" element={<AllAuthors />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/admin/about-us" element={<AdminAboutUs />} />
        <Route path="/admin/locations" element={<AdminLocation />} />
        <Route path="/admin/bestsellers" element={<AdminBestseller />} />
        <Route path="/admin/authors" element={<AdminAuthor />} />
        <Route path="/admin/conference" element={<AdminConference />} />
        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="/admin/export-info" element={<AdminExportInfo />} />
        <Route path="/admin/management" element={<AdminManagement />} />
        <Route path="/admin/publisher" element={<AdminPublisher />} />
        <Route path="/admin/special-agency" element={<AdminSpecialAgency />} />
        <Route path="/admin/images" element={<AdminUpdateImage />} />
        <Route path="/admin/journal" element={<AdminJournal />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/general-tyles" element={  <GeneralTiles/>} />
        <Route path="/conf-prec-books" element={<ConfPrecBooks />} />
        <Route path="/search-results" element={<SearchResultsPage />} /> 
        {/* <Route path="/items" element={<ItemsList />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressDetail/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/admin/delivery" element={<AdminDeliveryCharges/>} />
        <Route path="/admin/orders" element={<AdminPayment/>} />
        <Route path="/view-order/:tempOrderId" element={<ViewOrder />} />

      </Routes>
    </Router>
  );
}

export default App;



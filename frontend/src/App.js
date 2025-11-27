import React from "react";
import { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/Home";
import DistributionPage from "./components/Distribution/DistributionPage";
import SpecializedAgencies from "./components/SpecializedAgencies/SpecializedAgencies";
import ExportDPage from "./components/ExportDivision/ExportDivison";
import ContactPage from "./components/Contact/ContactPage";
import ConfPrec from "./components/ConfPrec/ConfPrec";
import AboutUsPage from "./components/AboutUsPage/AboutUsPage";
import Management from "./components/Management/management";
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
import SearchResultsPage from "./components/SearchResultsPage";
import AdminUpdateImage from "./components/Admin/AdminUpdateImage";
import AdminJournal from "./components/Admin/AdminJournal";
import AddressDetail from "./components/Address/AddressDetail";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment";
import AdminPayment from "./components/Admin/AdminOrders";
import AdminDeliveryCharges from "./components/Admin/AdminDeliveryCharges";
import AdminGeneral from "./components/Admin/AdminGeneral";
import AdminConferenceBooks from "./components/Admin/AdminConferenceBooks";
import AdminCategory from "./components/Admin/AdminCategory";
import AdminConferenceCategory from "./components/Admin/AdminConferenceCategory";
import AdminQRCode from "./components/Admin/AdminQRcode";
import AdminRoute from "./components/AdminRoute";
import AdminAboutUsPage from "./components/Admin/AdminAboutUsPage";
import LoaderProvider from "./components/Loader/LoaderProvider";
import AdminLink from "./components/Admin/AdminLink";
import GeneralCatalogueUpload from "./components/Admin/GeneralCatalogueUpload";
import ConferenceCatalogueUpload from "./components/Admin/ConferenceCatalogueUpload";
import AdminForeignBooks from "./components/Admin/AdminForeignBooks";
import ForeignBooksDisplay from "./components/ForeignBooks/ForeignBooks";

function App() {

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <Router>
       <LoaderProvider>
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
        <Route path="/admin/about-us" element={ <AdminRoute requiredRole="admin"><AdminAboutUs /></AdminRoute>} />
        <Route path="/admin/about-us-page" element={ <AdminRoute requiredRole="admin"><AdminAboutUsPage /></AdminRoute>} />
        <Route path="/admin/locations" element={ <AdminRoute requiredRole="admin"><AdminLocation /></AdminRoute> } />
        <Route path="/admin/bestsellers" element={<AdminRoute requiredRole="admin"><AdminBestseller /></AdminRoute>} />
        <Route path="/admin/authors" element={<AdminRoute requiredRole="admin"><AdminAuthor /></AdminRoute>} />
        <Route path="/admin/conference" element={<AdminRoute requiredRole="admin"><AdminConference /></AdminRoute>} />
        <Route path="/admin/contact" element={<AdminRoute requiredRole="admin"><AdminContact /></AdminRoute>} />
        <Route path="/admin/export-info" element={<AdminRoute requiredRole="admin"><AdminExportInfo /></AdminRoute>} />
        <Route path="/admin/management" element={<AdminRoute requiredRole="admin"><AdminManagement /></AdminRoute>} />
        <Route path="/admin/publisher" element={<AdminRoute requiredRole="admin"><AdminPublisher /></AdminRoute>} />
        <Route path="/admin/special-agency" element={<AdminRoute requiredRole="admin"><AdminSpecialAgency /></AdminRoute>} />
        <Route path="/admin/images" element={<AdminRoute requiredRole="admin"><AdminUpdateImage /></AdminRoute>} />
        <Route path="/admin/journal" element={<AdminRoute requiredRole="admin"><AdminJournal /></AdminRoute>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/general-tyles" element={  <GeneralTiles/>} />
        <Route path="/conf-prec-books" element={<ConfPrecBooks />} />
         <Route path="/foreign-books" element={<ForeignBooksDisplay />} />
        <Route path="/search-results" element={<SearchResultsPage />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressDetail/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/admin/delivery" element={<AdminRoute requiredRole="admin"><AdminDeliveryCharges/></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute requiredRole="admin"><AdminPayment/></AdminRoute>} />
        <Route path="/admin/general/upload" element={<AdminRoute requiredRole="admin"><AdminGeneral/></AdminRoute>} />
        <Route path="/admin/conference/upload" element={<AdminRoute requiredRole="admin"><AdminConferenceBooks/></AdminRoute>} />
         <Route path="/admin/foreign/upload" element={<AdminRoute requiredRole="admin"><AdminForeignBooks/></AdminRoute>} />
        <Route path="/admin/category" element={<AdminRoute requiredRole="admin"><AdminCategory/></AdminRoute>} />
        <Route path="/admin/conference-categories" element={<AdminRoute requiredRole="admin"><AdminConferenceCategory/></AdminRoute>} />
        <Route path="/admin/qrcode" element={<AdminRoute requiredRole="admin"><AdminQRCode/></AdminRoute>} />
        <Route path="/admin/link" element={<AdminRoute requiredRole="admin"><AdminLink /></AdminRoute>} />
        {/* <Route path="/admin/general/catalogue" element={<AdminCatalogue/>}></Route> */}
        <Route path="/admin/general/catalogue" element={<AdminRoute requiredRole="admin"><GeneralCatalogueUpload /></AdminRoute>} />
<Route path="/admin/conf/catalogue" element={<AdminRoute requiredRole="admin"><ConferenceCatalogueUpload /></AdminRoute>} />
      </Routes>
      </LoaderProvider>
    </Router>
  );
}

export default App;



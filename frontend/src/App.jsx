import "./App.css";
import { useContext } from "react";
import { lazy, Suspense } from "react";
import Home from "./Pages/Home";

// lazy loading the pages

import SignUpPageBusiness from "./Pages/SignUpPageBusiness";
import SignUpPageInfluencer from "./Pages/SignUpPageInfluencer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Components/Chatcomponents/Chat";
import Aboutus from "./Pages/Aboutus";
import Whyus from "./Pages/Whyus";
import Error from "./Pages/errorPages/notFound";
import ErrorUnauthorized from "./Pages/errorPages/unauthorized";
import RequireAuth from "./Components/RequireAuth";
import CampaignDetailInfluencer from "./Components/InfluencerComponents/CampaignDetail";
import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/AdminHome";
import AccountVerification from "./Pages/AccountVerification";
import Profilecompletion from "./Pages/Profilecompletion";
import Users from "./Pages/adminPages/Users";
import BrandUsers from "./Pages/adminPages/BrandUsers";
import BusinessHome from "./Pages/brandPages/BusinessHome";
import BusinessLogin from "./Pages/BusinessLogin";
import InfluencerLogin from "./Pages/InfluencerLogin";
import InfluencerDetails from "./Pages/InfluencerDetails";
import InfluencerHome from "./Pages/InfluencerHome";
import PasswordReset from "./Pages/passwordReset";
import NewCampaignPage from "./Pages/brandPages/NewCampaign";
import Campaign from "./Pages/brandPages/Campaign";
import { LaunchCampaign } from "./Pages/brand/launchCampaign";
import CampaignDetail from "./Pages/brandPages/CampaignDetail";
import { AuthContext } from "./utils/authProvider";
import ActivationRequests from "./Pages/adminPages/ActivationRequests";
import { BrandHome } from "./Pages/brand/brandHome";
import { Marketplace } from "./Pages/brand/marketplace";
import { InfluencerListing } from "./Pages/brand/influencerListing";
import { InfluencerProfile } from "./Pages/brand/influencerProfile";
import InfluencerAllCampaigns from "./Components/InfluencerComponents/InfluencerAllCampaigns";
import SocialProfile from "./Components/InfluencerComponents/SocialProfile";
import { BrandProfile } from "./Pages/brand/brandProfile";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import AccountNotVerified from "./Pages/AccountNotVerified";
import Wrapper from "./Components/wrapper";
import InfluencerContract from "./Pages/Contracts/InfluencerContract";
import InfluencerPayments from "./Components/InfluencerComponents/InfluencerPayments";
import { Privacy } from "./Pages/legal/privacypolicy";
import { Terms } from "./Pages/legal/termsofuse";
import MainScreen from "./Pages/MarketAutomation/MainScreen";
import ListDetails from "./Pages/brand/ListDetails";
import ManageCampaignPage from "./Components/brandComponents/ManageCampaignPage";
import BrandPayments from "./Pages/brand/BrandPayments";
import RequireAuthChat from "./Components/ChatWrapper";
import GeneratePdf from "./Pages/generatePdf";
const Services = lazy(import("./Pages/Services"));
// const Aboutus = lazy(import("./Pages/Aboutus"))
// const Whyus = lazy(import('./Pages/Whyus'))
// const AdminHome = lazy(import("./Pages/AdminHome"))
// const AccountVerification = lazy(import("./Pages/AccountVerification"))
// const Profilecompletion = lazy(import("./Pages/Profilecompletion"))
// const Users = lazy(import('./Pages/adminPages/Users'))
// const BrandUsers = lazy(import('./Pages/adminPages/BrandUsers'))
// const BusinessHome = lazy(import("./Pages/brandPages/BusinessHome"))
// const CampaginCreation = lazy(import('./Pages/brandPages/CampaginCreation'))
// const InfluencerDetails = lazy(import('./Pages/InfluencerDetails'))
// const InfluencerHome = lazy(import('./Pages/InfluencerHome'))
// const NewCampaignPage = lazy(import('./Pages/brandPages/NewCampaign'))
// const Campaign = lazy(import('./Pages/brandPages/Campaign'))
// const CampaignDetail = lazy(import('./Pages/brandPages/CampaignDetail'))
// const ErrorUnauthorized = lazy(import('./Pages/errorPages/unauthorized'))

function App() {
  const { loading } = useContext(AuthContext);

  return (
    <Router basename="/">
      <div className="app" data-theme="cupcake">
        {loading ? (
          <h1>loadig</h1>
        ) : (
          <Suspense fallback={<div>loading</div>}>
            <Routes>
              <Route
                path="/generate"
                element={<GeneratePdf></GeneratePdf>}
              ></Route>
              {/* Public Routes */}
              <Route
                element={
                  <RequireAuthChat
                    allowedRoles={["brand", "influencer"]}
                  ></RequireAuthChat>
                }
              >
                <Route path="/brandchat" element={<Chat />}></Route>
                <Route path="/influencerchat" element={<Chat />}></Route>
              </Route>
              <Route element={<Wrapper />}>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/influencerlogin"
                  element={<InfluencerLogin />}
                ></Route>
                <Route
                  path="/contract/:id"
                  element={<InfluencerContract />}
                ></Route>
                <Route
                  path="/marketautomation"
                  element={<MainScreen />}
                ></Route>

                <Route
                  path="/businesslogin"
                  element={<BusinessLogin />}
                ></Route>
                <Route path="/adminLogin" element={<AdminLogin />}></Route>
                <Route
                  path="/BusinessSignup"
                  element={<SignUpPageBusiness />}
                ></Route>
                <Route
                  path="/InfluencerSignup"
                  element={<SignUpPageInfluencer />}
                ></Route>
                <Route path="/aboutus" element={<Aboutus />}></Route>
                <Route path="/services" element={<Services />}></Route>
                <Route path="/whyus" element={<Whyus />}></Route>
                <Route path="/privacy" element={<Privacy />}></Route>
                <Route path="/terms" element={<Terms />}></Route>
                <Route path="/listdetails" element={<ListDetails />}></Route>
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path="/admin/home" element={<AdminHome />}></Route>
                <Route
                  path="/admin/home/influencer/:id"
                  element={<InfluencerDetails />}
                ></Route>
                <Route path="/admin/users" element={<Users />}></Route>
                <Route
                  path="/admin/users/influencer/:id"
                  element={<InfluencerDetails></InfluencerDetails>}
                ></Route>
                <Route
                  path="/admin/bUsers/influencer/:id"
                  element={<InfluencerDetails></InfluencerDetails>}
                ></Route>
                <Route path="/admin/bUsers" element={<BrandUsers />}></Route>
                <Route
                  path="/admin/activationRequests"
                  element={<ActivationRequests />}
                ></Route>
              </Route>

              {/* Brand Protected Routes */}
              <Route element={<RequireAuth allowedRoles={["brand"]} />}>
                <Route path="/businesshome" element={<BusinessHome />}></Route>
                <Route
                  path="/createCampaign"
                  element={<NewCampaignPage />}
                ></Route>
                <Route
                  path="/contract/:id"
                  element={<InfluencerContract />}
                ></Route>
                <Route path="/brandhome" element={<BrandHome />}></Route>
                <Route
                  path="/editcampaign/:id"
                  element={<LaunchCampaign />}
                ></Route>
                <Route path="/marketplace/" element={<Marketplace />}></Route>
                <Route
                  path="/influencerlisting/:id"
                  element={<InfluencerListing />}
                ></Route>

                <Route
                  path="/influencerprofile/:id"
                  element={<InfluencerProfile />}
                ></Route>
                <Route
                  path="managecampaign/:id"
                  element={<ManageCampaignPage></ManageCampaignPage>}
                ></Route>

                <Route path="/brandprofile" element={<BrandProfile />}></Route>
                <Route
                  path="/brand/linkedin"
                  element={<LinkedInCallback />}
                ></Route>

                <Route
                  path="/brandpayments/manage"
                  element={<BrandPayments />}
                ></Route>
              </Route>

              {/* <Route path='/campaigncreation' element={<CampaginCreation/>} ></Route>
            <Route path='/campaigns' element={<Campaign/>} ></Route>
            <Route path='/campaigns/:title' element={<CampaignDetail/>} ></Route> */}

              {/* Influencer Protected Routes */}
              <Route element={<RequireAuth allowedRoles={["influencer"]} />}>
                <Route
                  path="/profileCompletion"
                  element={<Profilecompletion />}
                ></Route>
                <Route
                  path="/influencerHome"
                  element={<InfluencerHome />}
                ></Route>
                <Route
                  path="/SocialProfile"
                  element={<SocialProfile />}
                ></Route>

                <Route
                  path="/accountnotverified"
                  element={<AccountNotVerified />}
                ></Route>
                <Route
                  path="/CampaignMarketPlace/"
                  element={<InfluencerAllCampaigns />}
                ></Route>
                <Route
                  path="/contract/:id"
                  element={<InfluencerContract />}
                ></Route>
                <Route
                  path="/payments/manage/"
                  element={<InfluencerPayments />}
                ></Route>
              </Route>

              <Route
                element={<RequireAuth allowedRoles={["influencer", "brand"]} />}
              >
                <Route
                  path="/listdetails/:id"
                  element={<ListDetails />}
                ></Route>
                <Route
                  path="/campaigndetails"
                  element={<CampaignDetailInfluencer />}
                ></Route>
              </Route>

              {/* Protected complementary Routes */}
              <Route path="/p" element={<Profilecompletion />}></Route>
              <Route path="/verify" element={<AccountVerification />}></Route>
              <Route path="/" element={<Profilecompletion />}></Route>
              <Route path="/chat" element={<Chat />}></Route>
              {/* <Route path='/' element={<CampaginCreation/>} ></Route> */}
              <Route path="/unauthorized" element={<ErrorUnauthorized />} />
              <Route
                path="/brandpayments/manage"
                element={<BrandPayments />}
              ></Route>

              <Route path="*" element={<Error />}></Route>
            </Routes>
          </Suspense>
        )}
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useContext } from "react";
import GettingStartedButton from "../Components/GettingStartedButton";
import Navbar from "../Components/Navbar";
import SignupModal from "../Components/SignupModal";
import img from "../images/Marketing-cuate.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image from "../images/Messaging-rafiki.png";
import headerImage from "../images/Digital-Marketing-PNG-Transparent-Picture.png";
import brandAwarnessImage from "../images/pngwing.com (2).png";
import roiImage from "../images/ROI.png";
import targetImage from "../images/pngegg.png";
import automationImage from "../images/automation.png";
import monetizeImage from "../images/Z-Blog-Cover-Influencer-Affiliate-Marketing-2022-08-23-A2-1.png";
import collaborationImage from "../images/Organizing projects-bro.png";
const Home = () => {
  const [openSignupModal, setOpenSignup] = useState(false);
  const handleClose = () => setOpenSignup(false);
  const navigate = useNavigate();

  return (
    <>
      {/* <section className="container mx-auto">
        <div className="flex flex-col-reverse h-screen items-center justify-evenly px-10  mx-auto space-x-1 space-y-0 md:flex-row ">
          <div className="flex flex-col justify-start  space-y-8 sm:justify-start ">
            <div className="flex flex-col space-y-1">
              <h1 className="text-xs font-bold text-blue font-Andika">
                {" "}
                A trusted influencer Marketing
                <br /> platform
              </h1>
              <h1 className="text-4xl font-extrabold sm:text-3xl">
                <span className="text-green">Influencer Marketing </span>
                <br />
                Platform That
                <br /> You Want
              </h1>
            </div>
            <p className="text-sm text-grey font-Andika">
              Providing best plateform for brands <br />
              to promote their business and for <br />
              content creators to earn online through
              <br />
              Influencer Marketing
            </p>
            <div>
              <button
                onClick={() => setOpenSignup(true)}
                className="px-3 pt-2 font-bold text-center text-white rounded-full drop-shadow-md md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
          <img
            className="sm:max-h-[250px]  md:max-h-[450px] "
            src={img}
            alt={img}
          ></img>
        </div>
      </section> */}
      <header className=" px-6 text-center bg-gradient-to-r bg-gradient-to-r from-gray-200 to-white ">
        <Navbar></Navbar>
        <div className="container mx-auto py-20">
          <div className="flex flex-wrap items-center -mx-4  ">
            <motion.div
              className="w-full md:w-1/2 px-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-5xl font-bold text-gray-600 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="text-blue">Supercharge</span> Your Marketing
              </motion.h1>
              <motion.p
                className="text-xl leading-relaxed font-medium mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Connect with the right influencers and grow your brand's reach.
                Leverage marketing automation to streamline your campaigns and
                achieve maximum impact.
              </motion.p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 px-4 mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img src={headerImage} alt="Hero Image" className="rounded-lg" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Benefits for Brands
          </motion.h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <motion.div
                className="bg-white rounded-lg p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={brandAwarnessImage}
                  alt="Brand Benefits"
                  className="mb-4 h-[60vh] rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-4">
                  Increased Brand Awareness
                </h3>
                <p className="text-gray-700">
                  Tap into the influence of popular content creators and expand
                  your brand's visibility among their engaged audiences.
                </p>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3  px-4 mb-8">
              <motion.div
                className="bg-white rounded-lg p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={roiImage}
                  alt="Brand Benefits"
                  className="mb-4 h-[60vh] rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-4">
                  Increased Return on Investment
                </h3>
                <p className="text-gray-700">
                  Influencers can provide genuine recommendations and reviews,
                  building trust and credibility for your brand.
                </p>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <motion.div
                className="bg-white rounded-lg p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img
                  src={targetImage}
                  alt="Brand Benefits"
                  className="mb-4 h-[60vh] rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-4">
                  Targeted Audience Reach
                </h3>
                <p className="text-gray-700">
                  Identify influencers whose audiences align with your target
                  market, ensuring your message reaches the right people.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Automation Section */}
      <section className="py-16 px-6 text-center">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Marketing Automation
          </motion.h2>
          <div className="flex flex-wrap items-center -mx-4">
            <motion.div
              className="w-full md:w-1/2 px-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={automationImage}
                alt="Marketing Automation"
                className="mb-4  rounded-lg"
              />
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 px-4 mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-xl font-medium leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Streamline your influencer marketing campaigns with our
                automation tool.
              </motion.p>
              <motion.a
                href="#"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits for Influencers Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Benefits for Influencers
          </motion.h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <motion.div
                className="bg-white rounded-lg p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={image}
                  alt="Influencer Benefits"
                  className="mb-4 h-[60vh] rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-4">
                  Brand Collaborations
                </h3>
                <p className="text-gray-700">
                  Partner with top brands and showcase your content to their
                  engaged audiences
                </p>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <motion.div
                className="bg-white rounded-lg p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={monetizeImage}
                  alt="Influencer Benefits"
                  className="mb-4 h-[60vh] rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-4">
                  Monetize Your Influence
                </h3>
                <p className="text-gray-700">
                  Earn revenue through sponsored posts, affiliate programs, and
                  other monetization opportunities.
                </p>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <motion.div
                className="bg-white rounded-lg p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img
                  src={collaborationImage}
                  alt="Influencer Benefits"
                  className="mb-4 h-[60vh] rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-4">
                  Collaboration Management
                </h3>
                <p className="text-gray-700">
                  Effortlessly manage your brand collaborations, track
                  deliverables, and optimize your partnerships.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* <SignupModal
        visible={openSignupModal}
        onClose={handleClose}
      ></SignupModal> */}
    </>
  );
};

export default Home;

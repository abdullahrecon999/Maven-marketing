import React, { useState, useContext } from "react";
import GettingStartedButton from "../Components/GettingStartedButton";
import Navbar from "../Components/Navbar";
import SignupModal from "../Components/SignupModal";
import img from "../images/Marketing-cuate.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openSignupModal, setOpenSignup] = useState(false);
  const handleClose = () => setOpenSignup(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <section className="container mx-auto">
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
      </section>
      {/* <main class="container mx-auto px-4 py-8 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="md:col-span-1">
            <h1 class="text-4xl font-bold mb-4">Maven Marketing</h1>
            <h2 class="text-2xl text-gray-700 mb-6">
              Connect with influencers and automate your marketing campaigns
              with ease.
            </h2>
            <a
              href="#"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </a>
          </div>
          <div class="md:col-span-1">
            <img
              src="path/to/your/image1.jpg"
              alt="Influencer Marketing"
              class="rounded-lg shadow"
            ></img>
          </div>
        </div>

        <section class="py-12">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-4">
              What is Influencer Marketing?
            </h2>
            <p class="text-gray-700 mb-6">
              Influencer marketing is a powerful strategy that leverages the
              reach and influence of social media personalities to promote
              products and services. It allows brands to tap into the engaged
              audiences of influencers and drive brand awareness, engagement,
              and conversions.
            </p>
          </div>
        </section>

        <section class="bg-blue-500 py-12 text-white">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-4">For Influencers</h2>
            <p class="text-lg mb-6">
              Are you an influencer looking to collaborate with brands and
              monetize your influence? Join our platform and gain access to a
              wide range of brand partnerships, campaign management tools, and
              analytics to grow your influence and revenue.
            </p>
            <a
              href="#"
              class="border border-white text-white font-bold py-2 px-4 rounded inline-block"
            >
              Learn More
            </a>
          </div>
          <div class="container mx-auto px-4 mt-8">
            <img
              src="path/to/your/image2.jpg"
              alt="For Influencers"
              class="rounded-lg shadow"
            ></img>
          </div>
        </section>

        <section class="bg-green-500 py-12 text-white">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-4">For Brands</h2>
            <p class="text-lg mb-6">
              Are you a brand looking to leverage the power of influencers to
              amplify your marketing efforts? Our platform provides you with the
              tools to discover, connect, and collaborate with relevant
              influencers, track campaign performance, and optimize your
              influencer marketing strategies.
            </p>
            <a
              href="#"
              class="border border-white text-white font-bold py-2 px-4 rounded inline-block"
            >
              Learn More
            </a>
          </div>
          <div class="container mx-auto px-4 mt-8">
            <img
              src="path/to/your/image3.jpg"
              alt="For Brands"
              class="rounded-lg shadow"
            ></img>
          </div>
        </section>

        <section class="py-12">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-4">Market Automation</h2>
            <p class="text-gray-700 mb-6">
              Our platform offers advanced market automation features to
              streamline your influencer marketing campaigns. From influencer
              discovery and outreach to campaign tracking and reporting, our
              automation tools simplify the entire process, saving you time and
              effort.
            </p>
          </div>
        </section>
      </main> */}

      {/* <SignupModal
        visible={openSignupModal}
        onClose={handleClose}
      ></SignupModal> */}
    </>
  );
};

export default Home;

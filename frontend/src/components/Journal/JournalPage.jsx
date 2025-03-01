import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Fotter";

const JournalPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg my-8">
          {/* Main Heading */}
          <h2 className="text-3xl font-bold text-green-700 text-center border-b-4 border-green-500 pb-2 mb-6">
            ALLIED PUBLISHERS SUBSCRIPTION AGENCY
          </h2>
          <p className="text-lg text-gray-700 text-center font-semibold">
            A single point of contact for all your Subscription needs.
          </p>

          <p className="text-gray-700 mt-4">
            Founded in 1974, Allied Publishers Subscription Agency (APSA) is today the
            largest subscription agent in India. We service the information needs of
            Indian Subscribers through worldwide Journals and Academic/Scientific
            Literature—whether in print or electronic format.
          </p>

          <p className="text-gray-700 mt-4">
            Allied is the largest Subscription agent in the country and one of the top
            25 Subscription Agents in the whole world. It is not a mere coincidence
            that thousands of libraries of Universities, Research Centres, Defense,
            Medical, Corporate houses, and the scientific world in general go through
            APSA for Journals, E-Books, Softwares, and CD-ROMs.
          </p>

          {/* Services */}
          <section className="mt-6">
            <h3 className="text-2xl font-semibold text-green-700 border-b pb-2 mb-3">
              Our Services
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Journals and E-Books from across the world</li>
              <li>Electronic Information Products, Standards, and Special/Technical Publications</li>
              <li>Gateway to all the leading online information providers</li>
            </ul>
          </section>

          {/* Special Services */}
          <section className="mt-6">
            <h3 className="text-2xl font-semibold text-green-700 border-b pb-2 mb-3">
              Our Special Services
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Proven Credibility</li>
              <li>Access to current pricing information for all journals</li>
              <li>No service charges – Publishers’ actual prices charged</li>
              <li>Speedy processing of orders through computerized operations</li>
              <li>Blanket permit by RBI to obtain drafts & issue of cheques</li>
              <li>Arrangements through Woodland Group (USA & UK) for faster delivery at no extra charge</li>
              <li>Automatic generation of claim letters for missing journal issues</li>
              <li>Automatic renewal notices to plan budgets</li>
            </ul>
          </section>

          {/* Journals & Magazines */}
          <section className="mt-6">
            <h3 className="text-2xl font-semibold text-green-700 border-b pb-2 mb-3">
              Journals & Magazines
            </h3>
            <p className="text-gray-700">
              We work closely with 65,000 publishers worldwide to continuously update
              the subscription information in our 260,000 titles-strong database. This
              allows us to rapidly supply you with all the information you need to make
              the best purchasing decisions possible.
            </p>
            <h4 className="text-lg font-semibold text-gray-800 mt-4">
              The strategies adopted to promote new journals include:
            </h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Direct Mail marketing</li>
              <li>Mailing of specimen copies on request</li>
              <li>Special promotional calls by sales representatives</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We are also an authorized provider of E-Journals and E-books from
              different international publishers like Elsevier, Wiley, Bentham, Proquest,
              Emerald, TMH, Springer, etc., for AICTE-approved institutions.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mt-6">
            <h3 className="text-2xl font-semibold text-green-700 border-b pb-2 mb-3">
              Branch Offices
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">Noida</h4>
                <p>Mr. R.N. Purwar</p>
                <p>D-5, Sector-2, Noida-201301</p>
                <p><span className="font-bold">Tel #:</span> 9810114020 / 0120-4352866</p>
                <p>
                  <span className="font-bold">Email:</span> 
                  <a href="mailto:rnpurwar@alliedpublishers.com" className="text-green-500 font-bold hover:text-blue-600 transition">
                    rnpurwar@alliedpublishers.com
                  </a>
                  , 
                  <a href="mailto:delhi.journals@alliedpublishers.com" className="text-green-500 font-bold hover:text-blue-600 transition">
                    delhi.journals@alliedpublishers.com
                  </a>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">Mumbai</h4>
                <p>Mr. A. George</p>
                <p>1st Floor Dubash House, 15 J.N. Heredia Marg, Ballard Estate, Mumbai-400 001</p>
                <p><span className="font-bold">Tel #:</span> 9820181716 / (022) 4212 6969/30/31</p>
                <p>
                  <span className="font-bold">Email:</span> 
                  <a href="mailto:ageorge@alliedpublishers.com" className="text-green-500 font-bold hover:text-blue-600 transition">
                    ageorge@alliedpublishers.com
                  </a>
                  , 
                  <a href="mailto:mumbai.journals@alliedpublishers.com" className="text-green-500 font-bold hover:text-blue-600 transition">
                    mumbai.journals@alliedpublishers.com
                  </a>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700">Chennai</h4>
                <p>Mr. L. Vasanth</p>
                <p>25/10, Commander in Chief Road, Ethiraj Lane, Egmore, Chennai-600 008</p>
                <p><span className="font-bold">Tel #:</span> 9849527263 / (044) 28215235</p>
                <p>
                  <span className="font-bold">Email:</span> 
                  <a href="mailto:vasant@alliedpublishers.com" className="text-green-500 font-bold hover:text-blue-600 transition">
                    vasant@alliedpublishers.com
                  </a>
                  , 
                  <a href="mailto:chennai.journals@alliedpublishers.com" className="text-green-500 font-bold hover:text-blue-600 transition">
                    chennai.journals@alliedpublishers.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default JournalPage;

/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useAuth } from "context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
export default function Index() {
  const {user } = useAuth();
  const navigate = useHistory();
  const handleClick = (e, btnType) => {
    e.preventDefault();
    if(btnType === "start") {
      navigate.push('/auth/login');
    }
    else {
      toast.success('Feature yet to be added ');
    }

  }
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Emirates Tax Platform - Your Automated Tax Solution
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Emirates Tax Platform simplifies tax compliance for businesses in the UAE. 
                Our automated system generates accurate tax reports, saves you time, and 
                ensures compliance with UAE tax regulations. Focus on your business while 
                we handle your tax reporting needs.
              </p>
              <div className="mt-12">
                <a
                  href=""
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  onClick={(e)=>handleClick(e, 'start')}
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  onClick={(e)=>handleClick(e, 'features')}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Tax Reporting Dashboard"
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="Tax Compliance"
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Streamlined Tax Reporting
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Our platform simplifies the complex process of tax reporting 
                    in the UAE. From VAT calculations to submission deadlines, 
                    we provide everything you need to stay compliant with minimal effort.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-calculator"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Automated Calculations
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Our system automatically calculates VAT, withholding tax, 
                        and other tax obligations based on your transactions.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-bell"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Deadline Alerts
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Never miss a tax submission deadline with our automated 
                        reminders and notifications.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-file-invoice"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Report Generation</h6>
                      <p className="mb-4 text-blueGray-500">
                        Generate FTA-compliant tax reports with just a few clicks, 
                        ready for submission.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-lock"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Secure Data Handling
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Your financial data is protected with enterprise-grade 
                        security and encryption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Comprehensive Tax Features
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Our platform covers all aspects of UAE tax compliance, from 
                standard VAT reporting to specialized industry requirements. 
                All features are designed to work seamlessly together.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  VAT Reporting
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Excise Tax
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Corporate Tax
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Withholding Tax
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Audit Trails
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Multi-company
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  ERP Integration
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Real-time Updates
                </span>
              </div>
              <a
                href="#features"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View All Features{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="VAT Report Sample"
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px -top-29-px"
                />
                <img
                  alt="Dashboard View"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                />
                <img
                  alt="Tax Calculation"
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                />
                <img
                  alt="Compliance Status"
                  src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <img
                  alt="Multi-company View"
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                />
                <img
                  alt="Deadline Alerts"
                  src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <a
                    href="#erp-integration"
                  >
                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="SAP Integration"
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        SAP Integration
                      </p>
                    </div>
                  </a>
                  <a
                    href="#accounting-software"
                  >
                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="QuickBooks"
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Intuit_QuickBooks_logo.png"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        QuickBooks
                      </p>
                    </div>
                  </a>
                  <a
                    href="#accounting-software"
                  >
                    <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="Xero"
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/76/Xero_software_logo.svg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Xero
                      </p>
                    </div>
                  </a>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <a
                    href="#erp-integration"
                  >
                    <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="Oracle"
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Oracle
                      </p>
                    </div>
                  </a>
                  <a
                    href="#accounting-software"
                  >
                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="Tally"
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Tally_logo.svg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Tally
                      </p>
                    </div>
                  </a>
                  <a
                    href="#custom-integration"
                  >
                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="Custom API"
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Custom API
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-plug text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Seamless Integrations
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Our platform integrates with all major accounting software and 
                ERP systems to automatically import your financial data, 
                eliminating manual entry and reducing errors.
              </p>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                For custom systems, we provide a robust API and dedicated 
                integration support.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Real-time Sync
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Data Validation
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Two-way Updates
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Custom Mapping
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Error Handling
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  API Access
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Webhooks
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Support
                </span>
              </div>
              <a
                href="#integrations"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View Integration Options{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-headset text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">
                  Dedicated Tax Support
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Our platform comes with comprehensive support to ensure your 
                  tax compliance is handled correctly. From setup to submission, 
                  our tax experts are available to assist you.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fas fa-user-tie"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Tax Experts On Call
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fas fa-calendar-check"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Compliance Calendar
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fas fa-file-alt"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Audit Support Documentation
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <img
                alt="Tax Support Team"
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-semibold text-4xl">Tax Solutions for Every Business</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              Whether you're a small business or a large enterprise, our platform 
              scales to meet your tax compliance needs. Explore our tailored 
              solutions for different business types and industries.
            </p>
          </div>
        </div>
      </section>

      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Small Business
                  </h5>
                  <Link to="/solutions/small-business">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="Small Business Tax Solution"
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Enterprises
                  </h5>
                  <Link to="/solutions/enterprise">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="Enterprise Tax Solution"
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Free Zones
                  </h5>
                  <Link to="/solutions/free-zone">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="Free Zone Tax Solution"
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-shield-alt text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Trusted by UAE Businesses
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                Emirates Tax Platform is the preferred tax compliance solution 
                for hundreds of businesses across the UAE. Our platform is 
                approved by tax consultants and auditors for its accuracy and 
                reliability.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Join the growing number of businesses that trust us with their 
                tax compliance needs.
              </p>
              <a
                href="#contact"
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Request Demo
              </a>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fas fa-building text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="clock">
                  ⏱️
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Ready to Save Time on Tax Compliance?
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Get started with Emirates Tax Platform today and transform how 
                your business handles tax reporting. Our team is ready to help 
                you set up and optimize your tax processes.
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="#pricing"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  View Pricing
                </a>
                <a
                  href="#contact"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  <i className="fas fa-envelope text-lg mr-1"></i>
                  <span>Contact Sales</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
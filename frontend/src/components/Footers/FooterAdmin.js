import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-10 min-h-35">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.emirates-tax-platform.ae"
                  className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                >
                  Emirates Tax Platform
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center">
                <li>
                  <a
                    href="https://www.emirates-tax-platform.ae/terms"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.emirates-tax-platform.ae/privacy"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.emirates-tax-platform.ae/contact"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.emirates-tax-platform.ae/compliance"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-blueGray-500">
              Emirates Tax Platform is registered with the Federal Tax Authority of the UAE
            </p>
            <p className="text-xs text-blueGray-400 mt-1">
              VAT Registration Number: 123456789012345
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
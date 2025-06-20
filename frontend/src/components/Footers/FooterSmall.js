import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.emirates-tax-platform.ae"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.emirates-tax-platform.ae/privacy"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.emirates-tax-platform.ae/contact"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tax.gov.ae"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FTA Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-blueGray-400">
              VAT Registration Number: AE123456789
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full flex ">
                     <h1 style={{color:'white', textAlign:'center', fontSize:"21px"}}>User Documents</h1>

        </div>
      </div>
    </>
  );
}

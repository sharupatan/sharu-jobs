import React from "react";
import {LeftSection, RightSection, CenterSection, Navbars} from "./index"

const HomePage = () => {
  const renderNavbar = () => (
    <div className="container-fluid sticky-top">
      <div className="row mb-3">
        <Navbars />
      </div>
    </div>
  );
  return (
    <div>
      {renderNavbar()}

      <div className="container">
        <div className="row">
          <div className="col-3 p-1">
            <div className="border border-3 rounded p-1">
              <LeftSection />
            </div>
          </div>
          <div className="col-5 p-1">
            <div className="border border-3 rounded p-1">
              <CenterSection />
            </div>
          </div>
          <div className="col-4 p-1">
            <div className="border border-3 rounded p-1">
              <RightSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

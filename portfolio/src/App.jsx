import React from "react";
import "./App.css";
import profile from "./assets/profile.png";

const App = () => {
  return (
    <>
      <div className="container">
        <div className="content-l">
          <div className="con-c1">
            <div className="con-c1-1">
              <img className="profile" src={profile} alt="profile" />
            </div>
            <div className="con-c1-2">
              A fourth-year student in Information Technology with passion in
              applying the acquired knowledge for purposeful work. I am excited
              about development and gaining new experiences in my carrier while
              working in a versatile team.
            </div>
          </div>
          <div className="con-c2"></div>
        </div>

        <div className="content-r">
          <div className="r-r1">
            <div className="r1-box">
              <div className="r1-box-left">
                <img className="proj-img" src={profile} alt="profile" />
              </div>
              <div className="r1-box-right">
                <div className="proj-info">
                  <h2 className="title">Campus Eats</h2>
                  <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    id dolor sed diam gravida molestie.
                  </p>
                </div>
              </div>
            </div>
            <div className="r1-box">
              <div className="r1-box-left">
                <img className="proj-img" src={profile} alt="profile" />
              </div>
              <div className="r1-box-right">
                <div className="proj-info">
                  <h2 className="title">Campus Eats</h2>
                  <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    id dolor sed diam gravida molestie.
                  </p>
                </div>
              </div>
            </div>
            <div className="r1-box">
              <div className="r1-box-left">
                <img className="proj-img" src={profile} alt="profile" />
              </div>
              <div className="r1-box-right">
                <div className="proj-info">
                  <h2 className="title">Campus Eats</h2>
                  <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    id dolor sed diam gravida molestie.
                  </p>
                </div>
              </div>
            </div>
            <div className="r1-box">
              <div className="r1-box-left">
                <img className="proj-img" src={profile} alt="profile" />
              </div>
              <div className="r1-box-right">
                <div className="proj-info">
                  <h2 className="title">Campus Eats</h2>
                  <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    id dolor sed diam gravida molestie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="r-r3">
            <div className="r3-box1"></div>
            <div className="r3-box2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

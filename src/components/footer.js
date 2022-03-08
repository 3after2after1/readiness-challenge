import "./footer.css";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import Logo from "../assets/Logo.svg";

function Footer() {
  return (
    <div className="footer-box">
      <div className="col-1">
        <img className="logo-component" src={Logo} /> 
        <span className="trex-name">TREX</span>
      </div>
      <div className="col-2">
        <div className="col-1-title">About us</div>
        <div className="col-1-list-about">Everything about us</div>
      </div>
      <div className="col-2">
        <div className="col-1-title">Categories</div>
        <div className="col-1-list" >
          <a href="" >Home</a>
        </div>
        <div className="col-1-list">
          <a href="">News</a>
        </div>
        <div className="col-1-list">
          <a href="">Watchlist</a>
        </div>
      </div>

      <div className="col-3">
        <div className="col-1-title-copy">© Copyright 2022 TREX</div>
      </div>
    </div>
  );
}

export default Footer;

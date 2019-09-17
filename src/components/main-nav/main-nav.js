import React, { useState } from "react"
import styled from "styled-components"
import "./main-nav.css"
import { Link } from "gatsby"

const Nav = styled.nav`
  position: relative;
  right: 60px;
  ul {
    margin-top: 0;
  }
  li {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    a {
      color: #827aa0;
      padding: 10px 15px;
      margin: 5px;
      border-radius: 15px;
      transition: color 0.25s, background 0.25s;
      &:hover {
        background: #ffffff;
        color: #100e17;
      }
    }
  }
  @media screen and (max-width: 710px) {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    padding: 20px;
    background: linear-gradient(
        180deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0.75) 100%
      ),
      linear-gradient(285.65deg, #cc00ff 0%, #00f0ff 84.25%);
    transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};
    transition: transform 0.25s;
    ul {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-evenly;
      text-align: center;
      li {
        font-size: 40px;
      }
    }
  }
`
const Hamburger = styled.button`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10;
`

const MainNav = () => {
  const [open, setOpen] = useState(false)
  console.log(open)
  return (
    <>
      <Hamburger className={`hamburger hamburger--squeeze ${ open ? "is-active": null }`} type="button" onClick={() => setOpen(!open)}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </Hamburger>
      <Nav className="font-display" open={open} setOpen={setOpen}>
        <ul>
          <li>
            <Link to="/">Posts</Link>
          </li>
          <li>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </Nav>
    </>
  )
}

export default MainNav

// // Initial state
// var scrollPos = 0;
// // adding scroll event
// window.addEventListener('scroll', function(){
//   // detects new state and compares it with the new one
//   if ((document.body.getBoundingClientRect()).top > scrollPos)
// 		document.getElementById('info-box').setAttribute('data-scroll-direction', 'UP');
// 	else
// 		document.getElementById('info-box').setAttribute('data-scroll-direction', 'DOWN');
// 	// saves the new position for iteration.
// 	scrollPos = (document.body.getBoundingClientRect()).top;
// });

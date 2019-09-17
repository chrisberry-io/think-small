import React from "react"
import styled from "styled-components"
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
`

const MainNav = () => {
  return (
    <Nav className="font-display">
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

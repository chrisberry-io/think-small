import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import "./layout.scss"
import styled from "styled-components"
import gatsbylogo from "../../../content/assets/vectors/Gatsby-Monogram.svg"

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #00bcd4 0%, #9c27b0 100%);
  padding-left: 10px;
`
const Content = styled.div`
  background: linear-gradient(180deg, rgba(16, 14, 23, 0.87) 0%, #100E17 92.76%), linear-gradient(116.32deg, #CC00FF 0%, #00F0FF 85.06%);
  position: relative;
  z-index: 0;
  p, ul {
    line-height: 1.5;
    margin: 10px 0;
  }
  li {
    list-style-type: initial;
    line-height: 1.5;
  }
  footer{
    color: #827AA0;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: auto;
      height: 16px;
      display: inline-block;
    }
  }
`

const Layout = (props) =>{
    const { children } = props
    return (
      <Wrapper className="font-body">
        <Content>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css?family=Hind:400,500,600,700|Noto+Sans:400,400i,700,700i&display=swap"
              rel="stylesheet"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
          </Helmet>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()} Chris Berry, Made with 🍺, 🦄, and&nbsp;<a href="https://www.gatsbyjs.org"><img src={gatsbylogo} alt="Gatsby" /></a>
          </footer>
        </Content>
      </Wrapper>
    )
  }

export default Layout

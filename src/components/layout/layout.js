import React from "react"
import { Link } from "gatsby"
import {Helmet} from "react-helmet"
import "./layout.scss"
import styled from "styled-components"
import logo from "../../../content/assets/vectors/logo-white.svg"
const HeaderLogo = styled(Link)`
  display: block;
  background: url(${logo});
  width: 130px;
  height: 74px;
  text-indent: -9999px;
`
const Wrapper = styled.div`
  background: linear-gradient(to bottom, #00bcd4 0%,#9c27b0 100%);
  padding-left: 10px;
`
const Content = styled.div`
  background: #100E17;
  p{
    line-height: 1.5;
  }
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1 className="fixed p-10 pt-0">
          <HeaderLogo to={`/`}>
            {title}
          </HeaderLogo>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <Wrapper>
      <Content>

      <Helmet>
      <link href="https://fonts.googleapis.com/css?family=Hind:400,500,600,700|Noto+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/>
      </Helmet>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Content>
      </Wrapper>
    )
  }
}

export default Layout

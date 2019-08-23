import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import "./layout.scss"
import styled from "styled-components"

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #00bcd4 0%, #9c27b0 100%);
  padding-left: 10px;
`
const Content = styled.div`
  background: #100e17;
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
`

class Layout extends React.Component {
  render() {
    const { children } = this.props
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

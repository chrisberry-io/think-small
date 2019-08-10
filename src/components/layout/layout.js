import React from "react"
import { Link } from "gatsby"
import {Helmet} from "react-helmet"
import "./layout.scss"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`}>
            {title}
          </Link>
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
      <div className="font-body">

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
      </div>
    )
  }
}

export default Layout

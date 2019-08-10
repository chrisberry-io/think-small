import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <div className="welcome">
      <h1>
        THINK<small>small</small>
      </h1>
      <p>As the web gets bigger, the case for thinking small gets stronger</p>
      <p>
        Developers have thought this way for a long time (e.g. <a href="https://en.wikipedia.org/wiki/Unix_philosophy">The Unix Philosophy</a>). It's only been in recent years that idea has caught on in the design world (e.g. Brad Frost's "<a href="http://bradfrost.com/blog/post/atomic-web-design/">Atomic Design</a>" and design systems).
      </p>
      <p>
        It's the goal of this site to evangelize this type of thinking. 
      </p>
    </div>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

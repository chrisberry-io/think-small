import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import PostSnap from "../components/postsnap/postsnap"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostSnap
              key={node.fields.slug}
              slug={node.fields.slug}
              title={title}
              day={node.day.date}
              month={node.month.date}
              year={node.year.date}
              description={node.frontmatter.description}
              excerpt={node.excerpt}
              color={node.frontmatter.color}
              image={node.frontmatter.featuredimg}
            />
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

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
          date(formatString: "MMM DD, YYYY")
          title
          description
          color
          featuredimg {
           publicURL
          }
        }
        month: frontmatter{
          date(formatString: "MMM")
        }
        day: frontmatter{
          date(formatString: "DD")
        }
        year: frontmatter{
          date(formatString: "YYYY")
        }
      }
    }
  }
}
`

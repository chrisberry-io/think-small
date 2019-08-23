import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import PostSnap from "../components/postsnap/postsnap"
import SEO from "../components/seo"
import logo from "../../content/assets/vectors/logo-white.svg"
import TagSelect from "../components/tag-select"
const HeaderLogo = styled(Link)`
  display: block;
  background: url(${logo});
  width: 130px;
  height: 74px;
  text-indent: -9999px;
`
const PostList = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  max-width: 800px;
  padding: 0 40px 0 25px;
`
const SelectTag = styled(TagSelect)`
  height: 54px;
  max-width: 325px;
  width: 100%;
  background: none;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 15px;
`

class Tags extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const tag = this.props.pageContext.tag
    console.log(this.props)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <header>
          <h1 className="fixed p-10 pt-0">
            <HeaderLogo to={`/`}>{siteTitle}</HeaderLogo>
          </h1>
        </header>
        <PostList>
        <h2>Posts tagged with {tag}</h2>
        <SelectTag currentTag={tag}/>
        <SEO title="All posts" />
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
        </PostList>
      </Layout>
    )
  }
}

Tags.propTypes = {
  tag: PropTypes.string.isRequired,
  allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
          month: frontmatter {
            date(formatString: "MMM")
          }
          day: frontmatter {
            date(formatString: "DD")
          }
          year: frontmatter {
            date(formatString: "YYYY")
          }
        }
      }
    }
  }
`

import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import PostSnap from "../components/postsnap/postsnap"
import SEO from "../components/seo"
import logo from "../../content/assets/vectors/logo-white.svg"
const Header = styled.header`
    position: fixed;
    top: 0;
    background: #100E17;
    width: 100%;
    z-index: 15;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
      padding: 0 50px;
    }
    nav{
      position: relative;
      right: 60px;
      ul{
        margin-top: 0;
      }
      li{
        display: inline-block;  
        font-size: 16px;
        font-weight: bold;
        a{
          color: #827AA0;
          padding: 10px 15px;
          margin: 5px;
          border-radius: 15px;
          transition: color .25s, background .25s;
          &:hover{
            background: #ffffff;
            color: #100E17;
          }
        }
      }
    }
`
const HeaderLogo = styled(Link)`
  display: block;
  background: url(${logo});
  width: 182px;
  height: 80px;
  text-indent: -9999px;
`
const PostList = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  max-width: 1050px;
  padding: 90px 40px 0 25px;
`

const BlogIndex = (props) => {
    const { data } = props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(data)
    return (
      <Layout location={props.location} title={siteTitle}>
        <Header>
          <h1 className="p-10 pt-0">
            <HeaderLogo to={`/`}>{siteTitle}</HeaderLogo>
          </h1>
          <nav className="font-display">
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
          </nav>
        </Header>
        <PostList>
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
        </PostList>
      </Layout>
    )
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

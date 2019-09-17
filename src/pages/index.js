import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import PostSnap from "../components/postsnap/postsnap"
import SEO from "../components/seo"
import logo from "../../content/assets/vectors/logo-white.svg"
import MainNav from "../components/main-nav/main-nav"
const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 15;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
      padding: 0 50px;
      @media screen and (max-width: 675px) {
        margin: 15px auto;
      }
    }
`
const HeaderLogo = styled(Link)`
  display: block;
  background: url(${logo});
  width: 182px;
  height: 80px;
  text-indent: -9999px;
    @media screen and (max-width: 675px) {
      padding: 0 15px;
      width: 136px;
      height: 58px;
      background-size: cover;
    }
`
const PostList = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  max-width: 1050px;
  padding: 90px 40px 0 25px;
`

const BlogIndex = (props, {open, setOpen}) => {
    const { data } = props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(open)
    console.log(props.open)
    return (
      <Layout location={props.location} title={siteTitle}>
        <Header>
          <h1 className="p-10 pt-0">
            <HeaderLogo to={`/`}>{siteTitle}</HeaderLogo>
          </h1>
          <MainNav />
        </Header>
        <PostList>
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

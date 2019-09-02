import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import logo from "../../content/assets/vectors/logo-dark.svg"
import lines from "../../content/assets/vectors/lines.svg"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"
// Utilities
import kebabCase from "lodash/kebabCase"
import { saturate } from "polished"
import MainNav from "../components/main-nav"
const HeaderLogo = styled(Link)`
  display: block;
  background: url(${logo});
  width: 130px;
  height: 74px;
  text-indent: -9999px;
`
const Sidebar = styled.aside`
  background: #ffffff;
  overflow: hidden;
  padding: 0 20px;
  .date {
    display: flex;
    align-items: center;
  }
  .day {
    background: linear-gradient(135deg, #f7a900 0%, #ff5400 100%);
    width: 150px;
    height: 150px;
    border-radius: 100px;
    font-size: 34px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    color: #fff;
    position: relative;
    margin-left: -95px;
    margin-right: 10px;
    float: left;
    &:after {
      display: block;
      content: "";
      background: url(${lines});
      width: 82px;
      height: 93px;
      position: absolute;
      top: -10px;
    }
    &:before {
      display: block;
      content: "";
      background: url(${lines});
      width: 82px;
      height: 93px;
      position: absolute;
      bottom: -25px;
      right: -10px;
    }
  }
  .month,
  .year {
    color: orangered;
  }
  .byline {
    margin: 35px 0;
  }
  .auth-label {
    font-weight: 600;
    font-size: 16px;
    color: #c4c4c4;
    display: block;
  }
  .auth-name {
    font-weight: 600;
    color: #100e17;
    display: block;
    font-size: 25px;
  }
  @media only screen and (max-width: 675px) {
    .date {
      float: left;
      margin-right: 20px;
    }
    .day {
      margin-left: -40px;
      height: 80px;
      width: 80px;
    }
  }
`
const Content = styled.article`
  background: #ffffff;
  max-width: 900px;
  border-left: 1px solid #e5e5e5;
  padding-top: 80px;
  padding-bottom: 100px;

  h1:after {
    display: block;
    content: "";
    height: 1px;
    width: 40px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    left: -40px;
    bottom: -20px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Hind", san-serif;
    font-weight: bold;
  }
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 25px;
  }
  h4 {
    font-size: 20px;
  }
  h5,
  h6 {
    font-size: 16px;
  }
  @media only screen and (max-width: 675px) {
    padding-top: 40px;
    h1 {
      margin: 0 0 30px;
    }
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 215px 1fr;
  @media only screen and (max-width: 675px) {
    display: block;
  }
`
const Tag = styled.li`
  display: inline-block;
  border: 1px solid #e5e5e5;
  list-style-type: none;
  margin: 3px;
  transition: border .25s, box-shadow .25s, transform .25s, color .25s, background .25s;
  background: #fff;
  a{
    display: block;
    padding: 10px;
  }
  &:hover{
    transform: scale(1.2);
    border: 1px solid #00bcd4;
    box-shadow: 5px 5px 0 #e5e5e5; 
    color: #fff;
    background: #00bcd4;
  }
`
const PostNav = styled(Link)`
  background: linear-gradient(135deg, #0ed2e3 0%, #05abe0 100%);
  display: block;
  margin-top: 40px;
  padding: 20px;
  position: relative;
  font-weight: bold;
  top: 0;
  transition: top 0.25s;
  &::after {
    display: block;
    position: absolute;
    content: "";
    border: 4px solid #100e17;
    height: 100%;
    width: 100%;
    top: 8px;
    left: 8px;
    transition: top 0.25s, left 0.25s;
  }
  &:hover {
    top: 15px;
    background: linear-gradient(
      135deg,
      ${saturate(0.5, "#0ed2e3")} 0%,
      ${saturate(0.5, "#05abe0")} 100%
    );
    &::after {
      left: -8px;
      top: -8px;
    }
  }
`

const BlogPostTemplate = props => {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  const siteUrl = props.data.site.siteMetadata.siteUrl
  const author = props.data.site.siteMetadata.author
  const { previous, next } = props.pageContext
  const tags = post.frontmatter.tags
  let disqusConfig = {
    url: `${siteUrl + post}`,
    identifier: post.id,
    title: post.frontmatter.title,
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <Wrapper>
        <Sidebar>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />
          <header>
            <h1>
              <HeaderLogo to={`/`}>{siteTitle}</HeaderLogo>
            </h1>
          </header>
          <div className="date">
            <div className="day">{post.day.date}</div>
            <div>
              <div className="month">{post.month.date}</div>
              <div className="year">{post.year.date}</div>
            </div>
          </div>
          <div className="byline">
            <span className="auth-label">Author</span>
            <span className="auth-name">{author}</span>
          </div>
          {tags !== null && (
            <ul>
              {tags.map((tag, index) => {
                //TODO: check for tags
                return <Tag key={index}><Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link></Tag>
              })}
            </ul>
          )}
        </Sidebar>
        <Content className="pl-10 pr-16">
          <MainNav />
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Bio />

          {previous && (
            <PostNav
              to={previous.fields.slug}
              rel="prev"
              className="float-left font-display"
            >
              ← {previous.frontmatter.title}
            </PostNav>
          )}

          {next && (
            <PostNav
              to={next.fields.slug}
              rel="next"
              className="float-right font-display"
            >
              {next.frontmatter.title} →
            </PostNav>
          )}

          <CommentCount config={disqusConfig} placeholder={"..."} />
          <Disqus config={disqusConfig} />
          
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
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
`

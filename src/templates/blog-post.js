import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import logo from "../../content/assets/vectors/logo-dark.svg"
import lines from "../../content/assets/vectors/lines.svg"
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
    background: orangered;
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
  .byline{
    margin: 35px 0;
  }
  .auth-label{
    font-weight: 600;
    font-size: 16px;
    color: #c4c4c4;
    display: block;
  }
  .auth-name{
    font-weight 600;
    color: #100E17;
    display: block;
    font-size: 25px;
  }
  @media only screen and (max-width: 675px) {
    .date{
      float: left;
    }
  }
`
const Content = styled.article`
  background: #ffffff;
  max-width: 900px;
  border-left: 1px solid #e5e5e5;
  padding-top: 80px;

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
  h1 {
    font-size: 60px;
    font-family: "Hind", san-serif;
    font-weight: bold;
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
  border 1px solid #e5e5e5;
  padding: 10px;
  list-style-type: none;
  margin: 0 5px 5px 0;
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const author = this.props.data.site.siteMetadata.author
    const { previous, next } = this.props.pageContext
    const tags = post.frontmatter.tags

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
                  return <Tag key={index}>{tag}</Tag>
                })}
              </ul>
            )}
          </Sidebar>
          <Content className="pl-10 pr-16">
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Bio />

            <ul>
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </Content>
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
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

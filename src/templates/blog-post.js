import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
const Sidebar = styled.aside`
  background: #ffffff;
  overflow: hidden;
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
    justify-content: right;
    padding-right: 15px;
    color: #fff;
    position: relative;
    margin-left: -75px;
    margin-right: 10px;
    float: left;
  }
  .month, .year {
    color: orangered;
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
`
const Tag = styled.li`
  display: inline-block;
  border 1px solid #e5e5e5;
  padding: 10px;
  list-style-type: none;
  margin-right: 5px;
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const author = this.props.data.site.siteMetadata.author
    const { previous, next } = this.props.pageContext
    const tags = post.frontmatter.tags
    console.log(tags)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Wrapper>
          <Sidebar>
            <SEO
              title={post.frontmatter.title}
              description={post.frontmatter.description || post.excerpt}
            />
            <div className="date">
              <div className="day">{post.day.date}</div>
              <div>
                <div className="month">{post.month.date}</div>
                <div className="year">{post.year.date}</div>
              </div>
            </div>
            <span>Author</span>
            <span>{author}</span>
            <ul>
              {tags.map((tag, index) => {
                return <Tag key={index}>{tag}</Tag>
              })}
            </ul>
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

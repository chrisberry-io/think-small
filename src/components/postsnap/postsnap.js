import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import dots from "../../../content/assets/vectors/corner-dots.svg"
const Post = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
`
const Snippet = styled.div`
position: relative;
background-color: #ffffff;
border-radius: 0.9375rem;
  ${props => {
    if (props.color !== null && props.background !== null) {
      return `
      background: linear-gradient(135deg, ${props.color} 0%,${props.color} 100%), linear-gradient(135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%), url(${props.featuredImage});
      color: #fff;
      background-blend-mode: multiply, normal, normal;
      background-size: auto, auto, cover;
      background-position: center;
      `
    }
  }}

  &:after{
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,.2) 100%);
    border: 2px solid #ffffff;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: -1;
border-radius: 0.9375rem;
  }

  &:before{
    display: block;
    content: url(${dots});
    width: 95px;
    height: 100px;
    position: absolute;
    right: -10px;
    top: -10px;
}
  }
`
const PostLink = styled(Link)`
  border: none;
`
const Date = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  width: 5rem;
`
const MonthYear = styled.div`
  color: rgba(255, 255, 255, 0.5);
`
const Day = styled.div`
  background-color: #fff;
  width: 2.1875rem;
  height: 2.1875rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
class PostSnap extends React.Component {
  render() {
    let background
    if (this.props.image !== null) {
      background = `${this.props.image.publicURL}`
    } else {
      background = false
    }
    console.log(background)
    return (
      <Post className="mt-16">
        <Date>
          <Day>
            <span>{this.props.day}</span>
          </Day>
          <MonthYear>
            {this.props.month}
            <br />
            {this.props.year}
          </MonthYear>
        </Date>
        <Snippet
          color={this.props.color}
          featuredImage={background}
          className="p-12 rounded-lg bg-cover ml-4"
        >
          <h3 className="text-5xl font-display font-bold mb-2">
            <PostLink to={this.props.slug} className="no-underline">
              {this.props.title}
            </PostLink>
          </h3>
          <p
            dangerouslySetInnerHTML={{
              __html: this.props.description || this.props.excerpt,
            }}
          />
        </Snippet>
      </Post>
    )
  }
}

export default PostSnap

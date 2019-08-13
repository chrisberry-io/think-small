import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import styles from "./postsnap.module.scss"
import dots from "../../../content/assets/vectors/corner-dots.svg"
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
const MonthYear= styled.div`
  color: rgba( 255, 255, 255, .5);
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
      <article className={`${styles.post} mt-16`}>
        <div className={styles.date}>
          <div className={styles.day}>
            <span>{this.props.day}</span>
          </div>
          <MonthYear className={styles.monthyear}>
            {this.props.month}
            <br />
            {this.props.year}
          </MonthYear>
        </div>
        <Snippet
          color={this.props.color}
          featuredImage={background}
          className={`${styles.wrapper} p-12 rounded-lg bg-cover ml-4`}
        >
          <h3 className="text-3xl font-display font-bold mb-2">
            <PostLink to={this.props.slug} className="no-underline">{this.props.title}</PostLink>
          </h3>
          <p
            dangerouslySetInnerHTML={{
              __html: this.props.description || this.props.excerpt,
            }}
          />
        </Snippet>
      </article>
    )
  }
}

export default PostSnap

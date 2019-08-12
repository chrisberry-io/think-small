import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import styles from "./postsnap.module.scss"
const Snippet = styled.div`
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
      <article className={`${styles.post} m-2`}>
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
            className="font-body"
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

import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import dots from "../../../content/assets/vectors/corner-dots.svg"
const Post = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  position: relative;
  z-index: 1;
`
const Snippet = styled(Link)`
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
    border-radius: 0.9375rem;
    z-index: -1;
    transition: top .35s, left .35s;
    transition-delay: .15s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:before{
    display: block;
    content: url(${dots});
    width: 95px;
    height: 100px;
    position: absolute;
    right: -10px;
    top: -10px;
    z-index: 10;
    transition: top .35s, transform .35s;
    transition-delay: .15s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

&:hover{
    &:after{
      top: -15px;
      left: -15px;
    }
    &:before {
      transform: scale(1.2);
      top:-15px;
    }
  }
`
const Date = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  width: 7rem;
  @media screen and (max-width: 710px){
    display: flex;
    position: absolute;
    z-index:10;
    width: auto;
  }
`
const MonthYear = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  padding-top: 6px;
  @media screen and (max-width: 710px){
    margin-left: 10px;
    display: flex;
    align-items: center;
    padding: 0;
    br{
      display: none;
    }
  }
`
const Day = styled.div`
  background-color: #fff;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  @media screen and (max-width: 710px){
    position: relative;
    left: -10px;
  }
`
const PostSnap = props => {
  let background
  if (props.image !== null) {
    background = `${props.image.publicURL}`
  } else {
    background = false
  }
  console.log(background)
  return (
    <Post className="mt-16">
      <Date>
        <Day>
          <span>{props.day}</span>
        </Day>
        <MonthYear>
          {props.month}{' '}
          <br />
          {props.year}
        </MonthYear>
      </Date>
      <Snippet
        to={props.slug}
        color={props.color}
        featuredImage={background}
        className="p-12 rounded-lg bg-cover ml-4"
      >
        <h3 className="text-5xl font-display font-bold mb-2">{props.title}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: props.description || props.excerpt,
          }}
        />
      </Snippet>
    </Post>
  )
}

export default PostSnap

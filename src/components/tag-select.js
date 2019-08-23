import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
// Utilities
import kebabCase from "lodash/kebabCase"
const TagSelect = ({className}) => {
  const data = useStaticQuery(graphql`
    query TagQuery {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

const tags = data.allMarkdownRemark.group
tags.sort((a, b) => (a.totalCount > b.totalCount) ? -1 : 1)
console.log(tags)

const handleChange = event =>{
    event.preventDefault();
    // TODO: do something with form values
    navigate(event.target.value);
  };

return (
    <select onChange={handleChange} className={className}>
      {tags.map(tag => (
        <option key={tag.fieldValue} value={`/tags/${kebabCase(tag.fieldValue)}/`}>
          {tag.fieldValue} ({tag.totalCount})
        </option>
      ))}
    </select>
  )
}

export default TagSelect

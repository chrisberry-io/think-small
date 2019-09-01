import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
// Utilities
import kebabCase from "lodash/kebabCase"
const TagSelect = (props) => {
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
  tags.sort((a, b) => (a.totalCount > b.totalCount ? -1 : 1))

  const handleChange = event => {
    event.preventDefault()
    // TODO: do something with form values
    navigate(event.target.value)
  }

  // Set State
  // TODO: check for tag in "tags" that match currentTag, set as selected
  //const [tag, handleChange] = useState({currentTag});

console.log(props.current)

  return (
    <select onChange={handleChange} className={props.className} defaultValue={`/tags/${kebabCase(props.current)}/`}>
      {tags.map(tag => (
        <option
          key={tag.fieldValue}
          value={`/tags/${kebabCase(tag.fieldValue)}/`}
        >
          {tag.totalCount} posts tagged with {tag.fieldValue}
        </option>
      ))}
    </select>
  )
}

export default TagSelect

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <div className="welcome">
      <h1>
        Think<small>Small</small>
      </h1>
    </div>
  </>
)

export default IndexPage

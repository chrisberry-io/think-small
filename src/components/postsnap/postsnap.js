import React from "react"
import { Link, graphql } from "gatsby"
import styles from "./postsnap.module.scss"

class PostSnap extends React.Component {
  render() {
    let backgrounds
    if (this.props.image !== null) {
    backgrounds = {
        backgroundImage: `url(${this.props.image.publicURL})`,
        backgroundColor: `'${this.props.color}'`,
        backgroundBlendMode: 'multiply',
        color: '#fff'
    }
    } else {
        backgrounds = {
        backgroundColor: `'${this.props.color}'`
    }
    }
    //console.log(backgrounds)
    return (
        <article className={`${styles.post} m-2`}>
        <div className={styles.date}>
            <div className={styles.day}><span>{this.props.day}</span></div>
            <div style={{color: '#fff'}} className={styles.monthyear}>
                {this.props.month}<br/>
                {this.props.year}
            </div>
        </div>
        <div style={backgrounds} className={`${styles.wrapper} p-12 rounded-lg bg-cover`}>
        <h3 className='text-3xl font-display font-bold mb-2'>
          <Link to={this.props.slug}>
            {this.props.title}
          </Link>
        </h3>
        <p className='font-body'
          dangerouslySetInnerHTML={{
            __html: this.props.description || this.props.excerpt,
          }}
        />
      </div>
      </article>
    )
  }
}

export default PostSnap
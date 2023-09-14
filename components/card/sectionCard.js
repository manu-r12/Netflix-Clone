import React from 'react'
import Card from './card'
import styles from './sectionCards.module.css'
import Link from 'next/link'

const SectionCards = ({videos, title, size}) => {
  return (
    <section className={styles.container}>   

    <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
        {videos.map(v => {
          return (
              <Link href={`/video/${v.id}`}>
              <Card imgUrl = {v.imgUrl}
              size = {size}/> 
              </Link>
       )  }
              ) }
               </div>
    </section>
  )
}

export default SectionCards
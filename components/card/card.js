import styles from './card.module.css'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Card = ({imgUrl, size}) => {


    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
        
    }


  return (
    <div className={styles.container}>
    <motion.div className={classMap[size]} whileHover={{scale: 1.2}}>
    <Image src={imgUrl} alt='image' layout='fill' className={styles.cardImg}/>
    </motion.div>
    </div>
  )
}

export default Card
import React from 'react';

import styles from './Music.module.scss'

function Music() {
  

  return (
    <div className={styles.music}>
        <ul className={styles.music__list}>
            <li className={styles.music__item}><img src="/assets/images/Moon.png" alt='List icon' className={styles.music__image}/> Moon</li>
            <li className={styles.music__item}><img src="/assets/images/Chai.png" alt='List icon' className={styles.music__image}/> Chill</li>
            <li className={styles.music__item}><img src="/assets/images/Jazz.png" alt='List icon' className={styles.music__image}/> Jazzy</li>
        </ul>
    </div>
  )
}

export default Music
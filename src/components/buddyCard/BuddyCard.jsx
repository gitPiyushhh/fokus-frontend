import React from 'react';
import styles from './BuddyCard.module.scss';

function BuddyCard({name, grinding}) {
  return (
    <div className={styles.buddyCard}>
      <img src={`/assets/images/users/${name}.png`} alt="Buddy_image" className={styles.buddyCard__image}/>
      <p className={styles.buddyCard__name}>{name}</p>
      <p className={styles.buddyCard__aim}>{grinding.split(' ').filter((el, index) => index < 2).join(' ').concat('..')}</p>

      <div className={styles.buddyCard__actionsContainer}>
        <button className={styles.buddyCard__button} style={{color: 'green'}}>Accept</button>
        <button className={styles.buddyCard__button} style={{color: 'red'}}>Reject</button>
      </div>
    </div>
  )
}

export default BuddyCard
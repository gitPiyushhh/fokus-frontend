import React from "react";
import styles from "./Chat.module.scss";

function Chat({ name, status }) {
  return (
    <div className={styles.chat}>
      <img
        src={`/assets/images/users/${name}.png`}
        alt="Chat_image"
        className={styles.chat__image}
      />
        <div className={styles.chat__name}>{name}</div>
        <p className={styles.chat__status} style={{color: `${status.toLocaleUpperCase() === "ONLINE" ? "green" : "red"}`}}>{status.toLocaleUpperCase()}</p>
    </div>
  );
}

export default Chat;

import React from "react";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <img
      src={`/assets/images/Logo.png`}
      alt="Logo"
      className={styles.logo}
    />
  );
}

export default Logo;

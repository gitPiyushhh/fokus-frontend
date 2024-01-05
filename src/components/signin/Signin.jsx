import React, { useState } from "react";

import styles from "./Signin.module.scss";

function Signin() {
  /*
      State
  */
  const [userName] = useState("piyush");

  return (
    <div className={styles.signin}>
      {/* <button className={styles.signin__button} onClick={() => onSignin()}>
        Signin
      </button> */}

      <img src={`/assets/images/${userName}.png`} alt="Avatar" className={styles.signin__userAvatar}/>
    </div>
  );
}

export default Signin;

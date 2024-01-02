import React, { memo } from "react";
import styles from "./Scenes.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeScene } from "../../features/scenes/sceneSlice";

const pinSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    stroke="black"
    stroke-width="0.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    className={styles.scenes__pin}
  >
    <circle cx="12" cy="5" r="1.5" />
    <path d="M12 5v14M12 5c-2.5 4-4 6.5-4 9h8c0-2.5-1.5-5-4-9z" />
  </svg>
);

function Scenes() {
  const dispatch = useDispatch();
  const { activeScene } = useSelector((state) => state.scenes);

  return (
    <div className={styles.scenes}>
      <ul className={styles.scenes__list}>
        <li
          className={styles.scenes__item}
          onClick={() => dispatch(changeScene("Forest"))}
        >
          <img
            src="/assets/images/Forest.png"
            alt="List icon"
            className={styles.scenes__image}
          />

          {activeScene === "Forest" ? pinSvg : null}
        </li>

        <li
          className={styles.scenes__item}
          onClick={() => dispatch(changeScene("Development"))}
        >
          <img
            src="/assets/images/Development.png"
            alt="List icon"
            className={styles.scenes__image}
          />

          {activeScene === "Development" ? pinSvg : null}
        </li>
        <li
          className={styles.scenes__item}
          onClick={() => dispatch(changeScene("Tree"))}
        >
          <img
            src="/assets/images/Tree.png"
            alt="List icon"
            className={styles.scenes__image}
          />

          {activeScene === "Tree" ? pinSvg : null}
        </li>
        <li
          className={styles.scenes__item}
          onClick={() => dispatch(changeScene("Aqua"))}
        >
          <img
            src="/assets/images/Aqua.jpg"
            alt="List icon"
            className={styles.scenes__image}
          />

          {activeScene === "Aqua" ? pinSvg : null}
        </li>
        <li
          className={styles.scenes__item}
          onClick={() => dispatch(changeScene("Coding"))}
        >
          <img
            src="/assets/images/Coding.png"
            alt="List icon"
            className={styles.scenes__image}
          />

          {activeScene === "Coding" ? pinSvg : null}
        </li>
        <li
          className={styles.scenes__item}
          onClick={() => dispatch(changeScene("Sunshine"))}
        >
          <img
            src="/assets/images/Sunshine.jpg"
            alt="List icon"
            className={styles.scenes__image}
          />

          {activeScene === "Sunshine" ? pinSvg : null}
        </li>
      </ul>
    </div>
  );
}

export default memo(Scenes);

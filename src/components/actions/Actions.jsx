import React, { useState } from "react";
import styles from "./Actions.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../features/ui/uiSlice";

const options = [
  {
    name: "Music",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="iconbtn"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    ),
  },
  {
    name: "Scene",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 15 15"
        class="iconbtn"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.85001 7.50043C1.85001 4.37975 4.37963 1.85001 7.50001 1.85001C10.6204 1.85001 13.15 4.37975 13.15 7.50043C13.15 10.6211 10.6204 13.1509 7.50001 13.1509C4.37963 13.1509 1.85001 10.6211 1.85001 7.50043ZM7.50001 0.850006C3.82728 0.850006 0.850006 3.82753 0.850006 7.50043C0.850006 11.1733 3.82728 14.1509 7.50001 14.1509C11.1727 14.1509 14.15 11.1733 14.15 7.50043C14.15 3.82753 11.1727 0.850006 7.50001 0.850006ZM7.00001 8.00001V3.12811C7.16411 3.10954 7.33094 3.10001 7.50001 3.10001C9.93006 3.10001 11.9 5.07014 11.9 7.50043C11.9 7.66935 11.8905 7.83604 11.872 8.00001H7.00001Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    name: "Pomodoro",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 15 15"
        class="iconbtn"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L12.058 2.05806C12.3021 1.81398 12.6978 1.81398 12.9419 2.05806C13.186 2.30214 13.186 2.69786 12.9419 2.94194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13361 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.49998 8.49998V4.09998C5.06992 4.09998 3.09998 6.06992 3.09998 8.49998C3.09998 10.93 5.06992 12.9 7.49998 12.9C8.715 12.9 9.815 12.4075 10.6112 11.6112L7.49998 8.49998Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    name: "Buddy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1em" width="1em">
  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zm1 4c-1.59 0-3.09.47-4.35 1.29C8.19 14.4 9.84 15 12 15s3.81-.6 5.35-1.71C16.09 13.47 14.59 14 13 14z" />
</svg>

    ),
  },
  {
    name: "Calendar",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        stroke-width="0"
        class="iconbtn"
        fill="currentColor"
        stroke="currentColor"
        height="1em"
        width="1em"
      >
        <path fill="currentColor" stroke="currentColor" d="M30.56 8.47a8 8 0 0 0-7-7 64.29 64.29 0 0 0-15.06 0 8 8 0 0 0-7 7 64.29 64.29 0 0 0 0 15.06 8 8 0 0 0 7 7 64.29 64.29 0 0 0 15.06 0 8 8 0 0 0 7-7 64.29 64.29 0 0 0 0-15.06zM8.7 3.42a63.65 63.65 0 0 1 14.6 0A6 6 0 0 1 27.56 6H4.44A6 6 0 0 1 8.7 3.42zM28.58 23.3a6 6 0 0 1-5.28 5.28 63.65 63.65 0 0 1-14.6 0 6 6 0 0 1-5.28-5.28 63.65 63.65 0 0 1 0-14.6 5.44 5.44 0 0 1 .15-.7h24.86a5.44 5.44 0 0 1 .15.7 63.65 63.65 0 0 1 0 14.6z" />
        <path d="M9 11H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm-2 4v-2h2v2zM17 11h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm-2 4v-2h2v2zM25 11h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm-2 4v-2h2v2zM9 19H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm-2 4v-2h2v2zM25 19h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm-2 4v-2h2v2zM18.71 19.29a1 1 0 0 0-1.42 0L16 20.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29-1.3 1.29a1 1 0 0 0 1.42 1.42l1.29-1.3 1.29 1.3a1 1 0 0 0 1.42-1.42L17.41 22l1.3-1.29a1 1 0 0 0 0-1.42z" />
      </svg>
    ),
  },
];

function Actions() {
  const [active, setActive] = useState("Pomodoro");
  const dispatch = useDispatch();

  return (
    <div className={styles.actions}>
      {options.map((el) => (
        <div
          className={`${styles.actions__button} ${
            active === el.name ? styles.active : ""
          } `}
          onClick={() => {
            setActive(el.name);
            dispatch(open(el.name.toLocaleLowerCase()))
          }}
          key={el.name}
        >
          {el.icon}
          &nbsp; &nbsp;
          {el.name}
        </div>
      ))}
    </div>
  );
}

export default Actions;

import React, { useState } from "react";
import styles from "./Buddy.module.scss";
import { useSelector } from "react-redux";
import BuddyCard from "../buddyCard/BuddyCard";
import LineGraph from "../line-graph/LineGraph";
import Chat from "../chat/Chat";

const buddyData = [
  {
    name: "Harsh",
    grinding: "Adipisicing sit proident consequat eu ad reprehenderit ea.",
    status: "online",
  },
  {
    name: "Krishna",
    grinding: "Design",
    status: "offilne",
  },
  {
    name: "Hemant",
    grinding: "Devops",
    status: "offilne",
  },
];

function Buddy() {
  const { buddy } = useSelector((state) => state.ui);
  const [query, setQuery] = useState("");

  return (
    <>
      {buddy && (
        <div className={styles.buddy}>
          <div className={styles.buddy__inner}>
            <div className={styles.buddy__requestContainer}>
              {buddyData.map((buddy) => (
                <BuddyCard name={buddy.name} grinding={buddy.grinding} />
              ))}
            </div>

            <div className={styles.buddy__messageContainer}>
              <div className={styles.buddy__buddies}>
                {buddyData.filter(el => el.name.toLocaleLowerCase().includes(query)).map((buddy) => (
                  <Chat name={buddy.name} status={buddy.status} />
                ))}
              </div>

              <input
                type="text"
                value={query}
                className={styles.buddy__search}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buddy name"
              />
            </div>

            <div className={styles.buddy__analyticsContainer}>
              <LineGraph />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Buddy;

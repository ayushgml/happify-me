import React from "react";
import cardStyles from "./Card.module.css";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const { path, imgSrc, imgAlt, cardName, cardDesc } = props;

  return (
    <>
      <Link
        to={path}
        className={`${cardStyles.remove_underline} ${cardStyles.homecard}`}
      >
        <article>
          <section className={cardStyles.imgSection}>
            <img src={imgSrc} alt={imgAlt} />
          </section>
          <section className={cardStyles.textSection}>
            <h2>{cardName}</h2>
            <p>{cardDesc}</p>
          </section>
        </article>
        {/* <div className={cardStyles.arrow}>GO TO {cardName.toUpperCase()}</div> */}
      </Link>
    </>
  );
};

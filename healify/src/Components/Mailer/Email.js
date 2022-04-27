import React from "react";
import emailstyles from "./Email.module.css";
export const Email = ({
  maxLimit,
  message,
  messageTemplate,
  setMessageTemplate,
}) => {
  return (
    <div className={emailstyles.upper}>
      <div className={emailstyles.allabove}>
        <div className={emailstyles.container}>
          <div className={emailstyles["contact-box"]}>
            <div className={emailstyles.left}></div>
            <div className={emailstyles.right}>
              <h2>Send an Email With The Following Template</h2>

              <section className={`${emailstyles.messageBodyContainer}`}>
                <i
                  href="#"
                  class="previous round"
                  onClick={() => {
                    if (messageTemplate > 0)
                      setMessageTemplate((prev) => prev - 1);
                  }}
                >
                  &#8249;
                </i>

                <section style={{ minWidth: 150, minHeight: 150 }}>
                  {message}
                </section>
                <i
                  href="#"
                  class="next round"
                  onClick={() => {
                    if (messageTemplate < maxLimit - 1)
                      setMessageTemplate((prev) => prev + 1);
                  }}
                >
                  &#8250;
                </i>
              </section>
              {messageTemplate === 0 && (
                <h6>----------starting of templates----------</h6>
              )}
              {messageTemplate === maxLimit - 1 && (
                <h6>----------end of templates----------</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

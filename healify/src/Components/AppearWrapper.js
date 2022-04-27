import React from "react";
import "../App.css";
export const AppearWrapper = (props) => {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    const { current } = domRef;
    observer.observe(current);

    //                      👇
    return () => observer.unobserve(current);
  }, []);
  return (
    <div
      className={`classAlways ${isVisible ? " classVisible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

import { useState } from "react";

function Accordion({ title, children }) {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button onClick={toggleAccordion}>
        <span>
          {title}
          {isActive ? "-" : "+"}
        </span>
      </button>
      {isActive ? <div>{children}</div> : null}
    </div>
  );
}

export default Accordion;

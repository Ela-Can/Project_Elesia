import { createContext, useState, useContext } from "react";

const SubjectContext = createContext();

const INITIAL_STATE = {
  subjectList: [],
};

function SubjectProvider({ children }) {
  const [subject, setSubject] = useState(INITIAL_STATE);

  function setSubjectList(subject) {
    setSubject(subject);
  }

  function addSubject(newSubject) {
    setSubject((prevSubjectList) => {
      return [...prevSubjectList, newSubject];
    });
  }

  return (
    <SubjectContext.Provider
      value={{ subject, setSubject, setSubjectList, addSubject }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export { SubjectContext };

export default SubjectProvider;

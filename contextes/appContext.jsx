import React, { createContext } from 'react';

const MyContext = createContext();

export default MyContext;



export const MyProvider = (props) => {
    const [myVariable, setMyVariable] = React.useState({
        showTlbr: true,
        myString: 'Bonjour',
        demandNbr: 0,
          worksNbr: 0,
        demandFor: false,
        msgNlueNbr: 0,
        msgNlueNbrForWorker: 0,
        iamPostulant: false
      

    });
    const [showTlbr, setShowTlbr]=React.useState('true')
    return (
      <MyContext.Provider value={{ myVariable, setMyVariable }}>
        {props.children}
      </MyContext.Provider>
    );
  };
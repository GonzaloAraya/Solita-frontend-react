import React from "react";
import CustomTable from "./common/CustomTable";

const JourneyList = () => {
    return (
      <div className="App" >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CustomTable/>
          </div>
      </div>
    );
  }
  
  export default JourneyList;
  
import React, { useEffect } from "react";

const Logout = () => {

  useEffect(() => {
    sessionStorage.clear();
  }, []);

    return (
      <div className="App">
          Successfully logout <br></br>
          Come back soon
      </div>
    );
  }
  
  export default Logout;
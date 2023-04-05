import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Form from "./Signup.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_GREEN_CREME_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="new" element={<Construct info={launch_info} />} />
          <Route path="signup" element={<Form />} />
        </Routes>
        <ErrorNotification error={error} />
      </div>
    </BrowserRouter>
  );
}

export default App;

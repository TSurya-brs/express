import React, { useEffect, useState } from "react";
import axios from "axios";

const Foodapp2 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    const BaseURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const aParams = { query: "asdasd" };
    const options = {
      headers: {
        "x-app-id": "e28331cf",
        "x-app-key": "d578d9ba935d991b939fae6f0969dedf",
        "x-remote-user-id": "manoharv",
      },
    };

    try {
      const response = await axios.post(BaseURL, aParams, options);
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      setError("Error fetching data");
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={getData}>Fetch Data</button>
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Foodapp2;

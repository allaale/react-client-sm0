import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const serverUrl = "http://localhost:5000";
  const [data, setData] = useState({ price: "0.1", phone: null });
  const [response, setResponse] = useState({ text: "", type: "" });

  const submitHandler = async () => {
    // simple validation
    if (data.phone === null || data.phone?.length !== 9) {
      setResponse({ text: "Please add a valid number", type: "error" });
      return;
    }

    // call server
    setResponse({ text: "Processing..." });
    await axios
      .post(`${serverUrl}/process-local-payment`, JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (res) {
        // the api returns alot of messages , some of them errors and some of them success
        // so you can handle them.
        const { data } = res;
        if (data.responseMsg == "RCS_SUCCESS") {
          setResponse({ text: "successfully processed", type: "success" });
        } else {
          setResponse({ text: data.responseMsg, type: "error" });
        }
      })
      .catch(function (err) {
        setResponse({ text: `Payment failed ${err}`, type: "error" });
      });
  };

  return (
    <div className="App">
      <h1>JuuJuu 👌</h1>
      <div style={{ width: "400px", margin: "0 auto", marginTop: "5em" }}>
        <h4>Pay with Zaad/Evc/Sahal</h4>
      </div>
      <div className="box">
        <div className="display-flex-row display-space-bw">
          <strong>Iphone pro 13 max magnetto case</strong>
          <div className="display-flex-row">
            <p>$</p>
            <h4>145</h4>
          </div>
        </div>
        <hr></hr>

        <div className="display-flex-row display-space-bw">
          <div className="display-flex-row">
            <p>+252</p>
            <input
              type="number"
              placeholder="631234567"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <button className="button-primary" onClick={() => submitHandler()}>
            Pay now
          </button>
        </div>

        {/* response */}
        <p
          style={{
            color:
              response.type === "success"
                ? "green"
                : response.type === "error"
                ? "red"
                : "black",
          }}
        >
          {response.text}
        </p>
      </div>
    </div>
  );
}

export default App;

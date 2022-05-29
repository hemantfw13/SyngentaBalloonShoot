import "./App.css";
import Balloons from "./components/Balloons";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";

function App() {
  const [balloons, setBalloons] = useState([]);
  const [added, setAdded] = useState([]);
  const [shootNum, setShootNum] = useState("");

  //generates an array of random colors
  const colorGen = () => {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push([`#${Math.floor(Math.random() * 16777215).toString(16)}`, i]);
    }

    setBalloons(arr);
  };

  useEffect(() => {
    colorGen();
  }, []);

  //to shoot the balloons to empty div
  const handleClick = () => {
    let balloon = balloons.find((el) => el[1] == shootNum);
    if (!balloon) {
      toast.error("Not Valid Number");
      return;
    }
    const newArr = balloons.filter((el) => el[1] != shootNum);
    setBalloons([...newArr]);
    setAdded([...added, balloon]);
  };

  //to add the balloon back to original container

  const handleAdded = (el) => {
    let newArr = added.filter((elem) => el[1] !== elem[1]);
    setAdded([...newArr]);
    setBalloons([...balloons, el].sort((a, b) => a[1] - b[1]));
  };

  return (
    <div className="app">
      <div className="main">
        {balloons.map((el) => (
          <Balloons key={el[1]} color={el[0]} num={el[1]}></Balloons>
        ))}
      </div>

      <div
        className="empty"
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {added.map((el) => {
          return (
            <div onClick={() => handleAdded(el)}>
              <Balloons key={el[1]} color={el[0]} num={el[1]}></Balloons>
            </div>
          );
        })}
      </div>

      <div className="shoot">
        <TextField
          onChange={(e) => setShootNum(e.target.value)}
          id="outlined-basic"
          label="Enter Balloon Number"
          variant="outlined"
          type="number"
        />
        <Button onClick={handleClick} variant="contained">
          shoot
        </Button>
      </div>
    </div>
  );
}

export default App;

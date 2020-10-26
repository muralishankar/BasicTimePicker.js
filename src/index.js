import { TimePicker } from "./timePicker";
import "./styles.css";
import "./timePicker.css";

new TimePicker(
  document.getElementById("app"),
  {},
  {
    valueChange: (value) => {
      document.getElementById("TextContent").innerHTML = value;
    }
  }
);

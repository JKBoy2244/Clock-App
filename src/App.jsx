import Clock from "./clock";
import "./index.css";
import sky from "./assets/images/sky.png";

export default function App() {
  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${sea})` }}
    >
      <Clock intro="Hello there!" name="Jobayer" age={20} university="Queen Mary University of London" course="Computer Systems Engineering" number={5}
      />
    </div>
  );
}

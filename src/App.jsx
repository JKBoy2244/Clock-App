import Clock from "./clock";
import "./index.css";
import mosque from "./assets/images/mosque.png";

export default function App() {
  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${mosque})` }}
    >
      <Clock intro="Hello there!" name="Jobayer" age={20} university="Queen Mary University of London" course="Computer Systems Engineering" number={5}
      />
    </div>
  );
}

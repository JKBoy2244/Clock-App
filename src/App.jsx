import Clock from "./clock";
import "./index.css";
import sea from './assets/images/sea.png';


export default function App() {
  return <img src={sea} alt="Sea" />;
  return <Clock intro="Hello there!" name="Jobayer" age={20} university="Queen Mary University of London" course="Computer Systems Engineering" number={5} />;;
}

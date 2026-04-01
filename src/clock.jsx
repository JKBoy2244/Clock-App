import {useState, useEffect} from 'react';
import './index.css'
import countries from './countries';
import cities from './cities';
import timeZones from './timeZones';

export default function Clock(props) {

  const [country, setCountry] = useState("United Kingdom");
  const [time, setTime] = useState(new Date());
  const [city, setCity] = useState("")
  const [prayers, setPrayers] = useState({});
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones["United Kingdom"]);

  const handleChange = (e) => {
    setCountry(e.target.value);
    setCity("");
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  useEffect(() => {
    if (country) fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(city ? `${city}, ${country}` : country)}`).then(r => r.json()).then(d => {
      setPrayers(d.data.timings);
      setSelectedTimeZone(d.data.meta.timezone);
    });
  }, [country, city]);

  useEffect(() => {
    const Valid = setInterval(() => {
       setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(Valid);
    }
  }, []);

  function fetchTime() {

  try  {
    
    if (!country) return "undefined:undefined:undefined"
    const zone = selectedTimeZone || timeZones[country];

    return new Intl.DateTimeFormat("en-GB", {

       timeZone: zone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,

      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(time);

  } catch (error) {

    console.log("Hmmmm, can't display page, sorry!");
    alert("404 error");

   }
  }

  
  return (
    <div className="Option">
      <form>
         <select value={country} onChange={handleChange}>
           <option value="">Select a Country</option>
           {countries.map((c) => (
             <option key={c} value={c}>
               {c}
             </option>
           ))}
         </select>
        {cities[country] && (
           <select value={city || ""} onChange={handleCityChange}>
             <option value="">Select a City</option>
             {cities[country].map((c) => (
               <option key={c} value={c}>
                 {c}
               </option>
             ))}
           </select>
         )}
      </form>

      <div className="Clock">
         <li className="Country">{city} , {country}</li>
         <span className="Time">{fetchTime()}</span>
         <li className="Fajr">Fajr - {prayers.Fajr}</li>
         <li className="Dhuhr">Dhuhr - {prayers.Dhuhr}</li>
         <li className="Asr">Asr - {prayers.Asr}</li>
         <li className="Maghrib">Maghrib - {prayers.Maghrib}</li>
         <li className="Isha">Isha - {prayers.Isha}</li>
      </div>

      <div>

         <h1 className="Hi">{props.intro}</h1>
         <h2 className="Intro">My name is {props.name} and I am {props.age} years old. I go to {props.university} to study {props.course}!</h2>
         <h1 className="Clk">This is my prayer time clock app. All you need to do is select any random country and then, also any random city from that particular country. Then, you get their respective live time and live date as well as each {props.number} live prayer times immediately.
                               from that live date.</h1>
      </div>
    </div>
  )
}

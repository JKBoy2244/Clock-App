import {useState, useEffect} from 'react';
import './index.css'
import countries from './countries';
import cities from './cities';
import timeZones from './timeZones';

export default function Clock() {

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

         <h1 className="Hi">Hello there!</h1>
         <h2 className="Intro">My name is Jobayer Khan and I am 20 years old. I go to Queen Mary University of London to study Computer Systems Engineering!</h2>
         <h1 className="Clk">This is my prayer time clock app. All you need to do is select any random country and you get their respective live times and each 5 live prayer times immediately.</h1>
      </div>
    </div>
  );
}

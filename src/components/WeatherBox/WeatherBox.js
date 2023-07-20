import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d70d597cc261e33cc555b7946198ba8e&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
            setPending(false);
            setWeather(weatherData);
            setError(false);
          })
        } else {
          setWeather('');
          setError(true);
          setPending(false);
        }
    });
  }, []);


  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather && <WeatherSummary {...weather} /> }
      { pending && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;

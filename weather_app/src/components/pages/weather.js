import React, { useState, useEffect } from "react";
import { Col, Row, Typography, Switch } from 'antd';
import logo from './../../assets/sun_image.png';
import "./weather.css";

const Weather = () => {
    const { Text } = Typography;
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState("");
    const [temperatureValue, setTemperatureValue] = useState("");
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [greeting, setGreeting] = useState("");

    const API_KEY = "761471191d734446991125511252802"; // Replace with your API key

    useEffect(() => {
        setTemperature(true);
        setTemperatureValue("°C");
        setUsername(localStorage.getItem("username"));
        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                return "Good Morning ☀️";
            } else if (hour >= 12 && hour < 17) {
                return "Good Afternoon 🌤️";
            } else if (hour >= 17 && hour < 21) {
                return "Good Evening 🌆";
            } else {
                return "Good Night 🌙";
            }
        };
        setGreeting(getGreeting());
        getCurrentLocation();
    }, []);

    const handleToggle = (data) => {
        if (data == true) {
            setTemperatureValue("°C");
            setTemperature(true);
        } else if (data == false) {
            setTemperatureValue("°F");
            setTemperature(false);
        }
    };

    // Get user's current location method start
    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeatherDetails(`${latitude},${longitude}`);
                },
                (error) => {
                    setError("Location access denied. Please search manually.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };
    // Get user's current location method end


    // Weather Details Method Start 
    const getWeatherDetails = async (query) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=5`
            );
            const data = await response.json();
            if (response.ok) {
                setWeather(data);
                setForecast(data.forecast.forecastday);
            } else {
                setError(data.error?.message || "Failed to fetch weather data.");
                setWeather(null);
                setForecast(null);
            }
        } catch (err) {
            setError("Failed to fetch weather data.");
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            getWeatherDetails(city);
        }
    };
    // Weather Details Method End

    return (
        <div className="weather_details_body">
            {/*  Weather Details Header Start */}
            <div className="weather_details_header">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'start' }}>
                        <Text strong style={{ fontSize: '20px', color: '#fff' }}>Hi {username}, {greeting}</Text>
                    </Col>
                    <Col xs={2} sm={2} md={0} lg={0} xl={0}></Col>
                    <Col xs={10} sm={10} md={12} lg={12} xl={12}>
                        <form onSubmit={handleSearch} style={{ textAlign: 'end' }}>
                            <Switch checked={temperature} onChange={(e) => handleToggle(e)} checkedChildren="°C" unCheckedChildren="°F" defaultChecked style={{ background: "blue" }} />
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city name..."
                                style={{ padding: "8px", outline: "none", border: 'none', borderRadius: '5px 0px 0px 5px', marginLeft: '5px' }}
                            />
                            <button type="submit" style={{
                                padding: '7px', color: '#ffffff', background: '#2008e9',
                                border: 'none', borderRadius: '0px 5px 5px 0px'
                            }}>Search</button>
                        </form>
                    </Col>
                </Row>
            </div>
            {/*  Weather Details Header End */}


            {/* Weather Details Start */}
            <div className="weather_details_content">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!error && <Row >
                    <Col xs={0} sm={0} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                        <img src={logo} alt="weather icon" width="400px" height="400px" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                        {weather ? (
                            <div>
                                <h2 style={{ fontSize: '20px', color: '#fff', margin: '10px' }}>Weather in {weather.location.name}</h2>
                                <p style={{ fontSize: '55px', color: '#fff', margin: '0px' }}>{temperatureValue == '°C' ? weather.current.temp_c + temperatureValue : weather.current.temp_f + temperatureValue}</p>
                                <p style={{ color: "#fff", fontSize: '16px' }}>{weather.current.condition.text}</p>
                                <img src={weather.current.condition.icon} alt="weather icon" />
                                <p style={{ color: "#fff" }}> {weather.current.humidity}%</p>
                                <p style={{ color: "#fff" }}> {weather.current.wind_kph} km/h</p>
                            </div>
                        ) : (
                            <p style={{ color: "#fff" }}>Loading weather data...</p>
                        )}

                        {/* Forecast Display */}
                        {forecast && (
                            <>
                                <h3 style={{ color: "#fff", margin: "0px" }}>5-Days Forecast</h3>
                                <div style={{ paddingTop: "15px", display: 'flex', justifyContent: 'space-around', color: '#fff' }}>
                                    {forecast.map((day) => (

                                        <div key={day.date} className="weather_forecast_details">
                                            <h4 style={{ margin: '0px' }}> {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}</h4>
                                            <div>
                                                <img src={day.day.condition.icon} alt="weather icon" width='30px' height='30px' /><br />
                                                <p style={{ margin: '0px', fontSize: '10px' }}> {day.day.condition.text}</p>
                                            </div>
                                            <p>{temperatureValue == '°C' ? day.day.mintemp_c + temperatureValue : day.day.mintemp_f + temperatureValue} / {temperatureValue == '°C' ? day.day.maxtemp_c + temperatureValue : day.day.maxtemp_f + temperatureValue}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </Col>
                </Row>}
            </div>
            {/* Weather Details End */}
        </div>

    );
};

export default Weather;

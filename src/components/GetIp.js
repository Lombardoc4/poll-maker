import { useEffect, useState } from "react";

const GetIp = () => {
    const [ip, setIP] = useState('');

    //creating function to load ip address from the API
    const getData = async () => {
      const res = await fetch('https://geolocation-db.com/json/')
    //   console.log('ip data', res.data);
        const data = await res.json();
      setIP(data.IPv4)
    }

    useEffect( () => {
      //passing getData method to the lifecycle method
      getData()

    }, [])

    return (
      <div className="App">
        <h2>Your IP Address is</h2>
        <h4>{ip}</h4>
      </div>
    );
  }

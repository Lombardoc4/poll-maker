
const getIp = async() => {

    //creating function to load ip address from the API
      const res = await fetch('https://geolocation-db.com/json/')
    //   console.log('ip data', res.data);
        const data = await res.json();
        return data.IPv4;
    // return getData();

}

  export default getIp;
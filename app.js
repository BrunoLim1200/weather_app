window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.descricao-temperatura')
    let temperatureDegree = document.querySelector('.temperatura-graus')
    let temperatureTimezone = document.querySelector('.location-timezone')

    //Condicao para obter a geolocalizacao do usuario
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=87b4bd1b56833685828a395fdcff00ca`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const {temp} = data.main;
                    const {description, icon} = data.weather[0];
                    //Setando elementos DOM da API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    temperatureTimezone.textContent = `${data.name}/${data.sys.country}`
                    //Set icon
                    setIcons(icon, document.querySelector('.icon'))
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});
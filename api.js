document.addEventListener('DOMContentLoaded', () => {

  const apiKey = '64103b326fb292e23952ada6cf9d93d5';

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          error => reject(error)
        );
      } else {
        reject(new Error("Geolocalização não suportada pelo navegador."));
      }
    });
  }

  async function getWeatherByLocation() {
    try {
      const coordinates = await getLocation();
      const { latitude, longitude } = coordinates;

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);

      if (!weatherResponse.ok) {
        throw new Error(`Erro ao obter dados do clima: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      // Extrair a temperatura atual da resposta da API
      const temperaturaAtual = Math.round(weatherData.main.temp);

      // Extrair o nome da cidade da resposta da API
      const nomeCidade = weatherData.name;

      console.log("Temperatura atual: " + temperaturaAtual);
      console.log("Nome da cidade: " + nomeCidade);

      // Atualizar dinamicamente a temperatura e o nome da cidade no HTML
      const temperaturaElement = document.querySelector('.clima');
      const cidadeEleemnt = document.querySelector('.cidade');
      cidadeEleemnt.innerHTML = `${nomeCidade}`
      temperaturaElement.innerHTML = `${temperaturaAtual}<sup>°C</sup>`;
    } catch (error) {
      console.error('Erro ao obter dados do clima:', error.message);
    }
  }

  getWeatherByLocation();
});

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dictionnaire des coordonnées (lat, lng) pour les pays
const countryCoords = {
  Afghanistan: [33.93911, 67.709953],
  Albania: [41.153332, 20.168331],
  Algeria: [28.033886, 1.659626],
  Andorra: [42.546245, 1.601554],
  Angola: [-11.202692, 17.873887],
  'Antigua and Barbuda': [17.060816, -61.796428],
  Argentina: [-38.416097, -63.616672],
  Armenia: [40.069099, 45.038189],
  Australia: [-25.274398, 133.775136],
  Austria: [47.516231, 14.550072],
  Azerbaijan: [40.1431, 47.5769],
  Bahamas: [25.0343, -77.3963],
  Bahrain: [26.0667, 50.5577],
  Bangladesh: [23.6850, 90.3563],
  Barbados: [13.1939, -59.5432],
  Belarus: [53.7098, 27.9534],
  Belgium: [50.5039, 4.4699],
  Belize: [17.1899, -88.4976],
  Benin: [9.3077, 2.3158],
  Bhutan: [27.5142, 90.4336],
  Bolivia: [-16.2902, -63.5887],
  'Bosnia and Herzegovina': [43.9159, 17.6791],
  Botswana: [-22.3285, 24.6849],
  Brazil: [-14.2350, -51.9253],
  Brunei: [4.5353, 114.7277],
  Bulgaria: [42.7339, 25.4858],
  'Burkina Faso': [12.2383, -1.5616],
  Burma: [21.9162, 95.9560],
  Burundi: [-3.3731, 29.9189],
  'Cabo Verde': [16.5388, -23.0418],
  Cambodia: [12.5657, 104.9910],
  Cameroon: [7.3697, 12.3547],
  Canada: [56.1304, -106.3468],
  'Central African Republic': [6.6111, 20.9394],
  Chad: [15.4542, 18.7322],
  Chile: [-35.6751, -71.5430],
  China: [35.8617, 104.1954],
  Colombia: [4.5709, -74.2973],
  Comoros: [-11.8750, 43.8722],
  'Congo (Brazzaville)': [-0.2280, 15.8277],
  'Congo (Kinshasa)': [-4.0383, 21.7587],
  'Costa Rica': [9.7489, -83.7534],
  'Cote d\'Ivoire': [7.5400, -5.5471],
  Croatia: [45.1, 15.2],
  Cuba: [21.5218, -77.7812],
  Cyprus: [35.1264, 33.4299],
  Czechia: [49.8175, 15.4730],
  Denmark: [56.2639, 9.5018],
  Djibouti: [11.8251, 42.5903],
  Dominica: [15.4150, -61.3710],
  'Dominican Republic': [18.7357, -70.1627],
  Ecuador: [-1.8312, -78.1834],
  Egypt: [26.8206, 30.8025],
  'El Salvador': [13.7942, -88.8965],
  'Equatorial Guinea': [1.6508, 10.2679],
  Eritrea: [15.1794, 39.7823],
  Estonia: [58.5953, 25.0136],
  Eswatini: [-26.5225, 31.4659],
  Ethiopia: [9.1450, 40.4897],
  Fiji: [-16.5782, 179.4144],
  Finland: [61.9241, 25.7482],
  France: [46.2276, 2.2137],
  Gabon: [-0.8037, 11.6094],
  Gambia: [13.4432, -15.3101],
  Georgia: [42.3154, 43.3569],
  Germany: [51.1657, 10.4515],
  Ghana: [7.9465, -1.0232],
  Greece: [39.0742, 21.8243],
  Greenland: [71.7069, -42.6043],
  Grenada: [12.2628, -61.6042],
  Guatemala: [15.7835, -90.2308],
  Guinea: [9.9456, -9.6966],
  'Guinea-Bissau': [11.8037, -15.1804],
  Guyana: [4.8604, -58.9302],
  Haiti: [18.9712, -72.2852],
  'Holy See': [41.9029, 12.4534],
  Honduras: [15.2, -86.2419],
  Hungary: [47.1625, 19.5033],
  Iceland: [64.9631, -19.0208],
  India: [20.5937, 78.9629],
  Indonesia: [-0.7893, 113.9213],
  Iran: [32.4279, 53.6880],
  Iraq: [33.2232, 43.6793],
  Ireland: [53.4129, -8.2439],
  Israel: [31.0461, 34.8516],
  Italy: [41.8719, 12.5674],
  Jamaica: [18.1096, -77.2975],
  Japan: [36.2048, 138.2529],
  Jordan: [30.5852, 36.2384],
  Kazakhstan: [48.0196, 66.9237],
  Kenya: [-0.0236, 37.9062],
  Kosovo: [42.6026, 20.9030],
  Kuwait: [29.3117, 47.4818],
  Kyrgyzstan: [41.2044, 74.7661],
  Laos: [19.8563, 102.4955],
  Latvia: [56.8796, 24.6032],
  Lebanon: [33.8547, 35.8623],
  Lesotho: [-29.6100, 28.2336],
  Liberia: [6.4281, -9.4295],
  Libya: [26.3351, 17.2283],
  Liechtenstein: [47.1660, 9.5554],
  Lithuania: [55.1694, 23.8813],
  Luxembourg: [49.8153, 6.1296],
  Madagascar: [-18.7669, 46.8691],
  Malawi: [-13.2543, 34.3015],
  Malaysia: [4.2105, 101.9758],
  Maldives: [3.2028, 73.2207],
  Mali: [17.5707, -3.9962],
  Malta: [35.9375, 14.3754],
  Mauritania: [21.0079, -10.9408],
  Mauritius: [-20.3484, 57.5522],
  Mexico: [23.6345, -102.5528],
  Moldova: [47.4116, 28.3699],
  Monaco: [43.7503, 7.4128],
  Mongolia: [46.8625, 103.8467],
  Montenegro: [42.7087, 19.3744],
  Morocco: [31.7917, -7.0926],
  Mozambique: [-18.6657, 35.5296],
  Namibia: [-22.9576, 18.4904],
  Nepal: [28.3949, 84.1240],
  Netherlands: [52.1326, 5.2913],
  'New Zealand': [-40.9006, 174.8860],
  Nicaragua: [12.8654, -85.2072],
  Niger: [17.6078, 8.0817],
  Nigeria: [9.0820, 8.6753],
  'North Macedonia': [41.6086, 21.7453],
  Norway: [60.4720, 8.4689],
  Oman: [21.5126, 55.9233],
  Pakistan: [30.3753, 69.3451],
  Panama: [8.5380, -80.7821],
  'Papua New Guinea': [-6.3149, 143.9556],
  Paraguay: [-23.4425, -58.4438],
  Peru: [-9.1900, -75.0152],
  Philippines: [12.8797, 121.7740],
  Poland: [51.9194, 19.1451],
  Portugal: [39.3999, -8.2245],
  Qatar: [25.3548, 51.1839],
  Romania: [45.9432, 24.9668],
  Russia: [61.5240, 105.3188],
  Rwanda: [-1.9403, 29.8739],
  'Saint Kitts and Nevis': [17.3578, -62.7830],
  'Saint Lucia': [13.9094, -60.9789],
  'Saint Vincent and the Grenadines': [12.9843, -61.2872],
  'San Marino': [43.9424, 12.4578],
  'Sao Tome and Principe': [0.1864, 6.6131],
  'Saudi Arabia': [23.8859, 45.0792],
  Senegal: [14.4974, -14.4524],
  Serbia: [44.0165, 21.0059],
  Seychelles: [-4.6796, 55.4920],
  'Sierra Leone': [8.4606, -11.7799],
  Singapore: [1.3521, 103.8198],
  Slovakia: [48.6690, 19.6990],
  Slovenia: [46.1512, 14.9955],
  Somalia: [5.1521, 46.1996],
  'South Africa': [-30.5595, 22.9375],
  'South Korea': [35.9078, 127.7669],
  'South Sudan': [6.8770, 31.3070],
  Spain: [40.4637, -3.7492],
  'Sri Lanka': [7.8731, 80.7718],
  Sudan: [12.8628, 30.2176],
  Suriname: [3.9193, -56.0278],
  Sweden: [60.1282, 18.6435],
  Switzerland: [46.8182, 8.2275],
  Syria: [34.8021, 38.9968],
  'Taiwan*': [23.6978, 120.9605],
  Tajikistan: [38.8610, 71.2761],
  Tanzania: [-6.3690, 34.8888],
  Thailand: [15.8700, 100.9925],
  'Timor-Leste': [-8.8742, 125.7275],
  Togo: [8.6195, 0.8248],
  'Trinidad and Tobago': [10.6918, -61.2225],
  Tunisia: [33.8869, 9.5375],
  Turkey: [38.9637, 35.2433],
  US: [37.0902, -95.7129],
  Uganda: [1.3733, 32.2903],
  Ukraine: [48.3794, 31.1656],
  'United Arab Emirates': [23.4241, 53.8478],
  'United Kingdom': [55.3781, -3.4360],
  Uruguay: [-32.5228, -55.7658],
  Uzbekistan: [41.3775, 64.5853],
  Venezuela: [6.4238, -66.5897],
  Vietnam: [14.0583, 108.2772],
  'West Bank and Gaza': [31.9522, 35.2332],
  'Western Sahara': [24.2155, -12.8858],
  Yemen: [15.5527, 48.5164],
  Zambia: [-13.1339, 27.8493],
  Zimbabwe: [-19.0154, 29.1549]
};

const GlobalDiseaseMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/globaldata')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (entry) => (entry.disease?.name === 'COVID-19' || entry.disease?.name === 'Monkeypox') && entry.totalCases && entry.country?.name
        );

        const locs = filtered.map((entry) => {
          const countryName = entry.country.name;
          const coords = countryCoords[countryName] || [0, 0]; // fallback si pays non trouvé
          return {
            country: countryName,
            disease: entry.disease.name,
            totalCases: entry.totalCases,
            lat: coords[0],
            lng: coords[1],
          };
        });

        setLocations(locs);
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            position={[loc.lat, loc.lng]}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <strong>{loc.country}</strong>
              <br />
              Maladie : {loc.disease}
              <br />
              Total cas : {loc.totalCases}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GlobalDiseaseMap;

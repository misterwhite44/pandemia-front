import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dictionnaire des coordonnées (lat, lng) pour quelques pays
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
};

const GlobalDiseaseMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/globaldata')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (entry) => entry.disease?.name === 'COVID-19' && entry.totalCases && entry.country?.name
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

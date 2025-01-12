import { Box } from '@chakra-ui/react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

// Default center of the map
const center = { lat: 40.73061, lng: -73.935242 };

// Example coordinates with city and state details
const coordinates = [
  { lat: 40.73061, lng: -73.935242, city: 'New York City', state: 'New York' },
  { lat: 40.712776, lng: -74.005974, city: 'Manhattan', state: 'New York' },
  { lat: 40.758896, lng: -73.98513, city: 'Times Square', state: 'New York' },
];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null); 

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const handleMarkerClick = (index) => {
    setActiveMarker(index);
  };

  const handleMapClick = () => {
    setActiveMarker(null); 
  };

  return (
    <Box w="100vw" h="100vh">
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onClick={handleMapClick}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={{ lat: coord.lat, lng: coord.lng }}
            onClick={() => handleMarkerClick(index)} 
          >
            {activeMarker === index && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <h4>{coord.city}</h4>
                  <p>{coord.state}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </Box>
  );
}

export default App;

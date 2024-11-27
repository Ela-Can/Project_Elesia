import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function StoreLocator() {
  const center = [48.8566, 2.3522];

  return (
    <main>
      <h2>Trouvez le point de vente le plus proche</h2>
      <section>
        <div style={{ height: "400px", width: "100%", margin: "auto" }}>
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </section>
    </main>
  );
}

export default StoreLocator;

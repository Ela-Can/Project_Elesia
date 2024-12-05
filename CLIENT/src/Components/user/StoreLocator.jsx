import { useEffect } from "react";

function StoreLocator() {
  const center = [48.8566, 2.3522];

  useEffect(() => {
    const map = L.map("map").setView(center, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [center]);

  return (
    <main>
      <h2>Trouvez le point de vente le plus proche</h2>
      <section>
        <div
          id="map"
          style={{ height: "400px", width: "100%", margin: "auto" }}
          aria-label="Carte interactive pour trouver le point de vente le plus proche"
        ></div>
      </section>
    </main>
  );
}

export default StoreLocator;

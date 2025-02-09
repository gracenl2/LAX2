
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const Location = () => {
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null);
  const [address, setAddress] = useState<string>("Loading location...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setAddress(data.display_name);
          } catch (error) {
            setAddress("Location unavailable");
          }
        },
        () => {
          setAddress("Location access denied");
        }
      );
    } else {
      setAddress("Geolocation not supported");
    }
  }, []);

  return (
    <div className="flex items-center space-x-2 text-white/90 animate-fade-up">
      <MapPin className="w-5 h-5" />
      <p className="text-sm font-medium truncate max-w-[300px]">{address}</p>
    </div>
  );
};

export default Location;

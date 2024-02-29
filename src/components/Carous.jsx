import { useEffect, useState } from "react";
import Kartu from "./Kartu";
import Customdata from "../data/data";

export default function Carous() {
  const [data, setData] = useState([]);
  // Get data dari API
  useEffect(() => {
    setData(Customdata);
  }, []);

  return (
    <>
      <div className="w-64 carousel rounded-box">
        {Object.keys(data).map((dt, index) => (
          <div key={index} className="carousel-item w-full">
            <Kartu
              url={data[index].url}
              judul={data[index].judul}
              desc={data[index].desc}
            />
          </div>
        ))}
      </div>
    </>
  );
}

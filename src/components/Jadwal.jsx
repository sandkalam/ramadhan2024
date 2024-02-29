import axios from "axios";
import { useEffect, useState } from "react";

export default function Jadwal() {
  const [dHijri, setDHijri] = useState([]);

  useEffect(() => {
    const getDateHijri = async () => {
      try {
        const response = await axios.get(
          "https://api.aladhan.com/v1/hijriCalendarByCity/1445/9?city=Tangerang&country=Indonesia&method=20"
        );
        setDHijri(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getDateHijri();
  }, []);
  const removeWIB = (time) => {
    return time.split(" (WIB)")[0];
  };
  return (
    <>
      <div className="overflow-x-auto w-full shadow-md  sm:rounded-lg">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr className="bg-[#273036] text-white font-bold py-2">
              <th>NO</th>
              <th>TANGGAL</th>
              <th>IMSAK</th>
              <th>FAJR</th>
              <th>TERBIT</th>
              <th>DZUHUR</th>
              <th>ASAR</th>
              <th>MAGRIB</th>
              <th>ISYA</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(dHijri).map((key, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{dHijri[index].date.readable}</td>
                <td>{removeWIB(dHijri[index].timings.Imsak)}</td>
                <td>{removeWIB(dHijri[index].timings.Fajr)}</td>
                <td>{removeWIB(dHijri[index].timings.Sunrise)}</td>
                <td>{removeWIB(dHijri[index].timings.Dhuhr)}</td>
                <td>{removeWIB(dHijri[index].timings.Asr)}</td>
                <td className="bg-gray-100">
                  {removeWIB(dHijri[index].timings.Maghrib)}
                </td>
                <td>{removeWIB(dHijri[index].timings.Isha)}</td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </>
  );
}

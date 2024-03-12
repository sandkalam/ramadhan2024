/* eslint-disable react/react-in-jsx-scope */
// import axios from "axios";
import { useState } from "react";
import moment from "moment";
import kota from "../data/kota";
// import kabupaten from "../data/kabupaten";

export default function Jadwal() {
  // const [dHijri, setDHijri] = useState([]);

  const [kalkot, setKalkot] = useState([kota]);
  // const [kalkab, setKalkab] = useState([kabupaten]);
  // useEffect(() => {
  //   const getDateHijri = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.aladhan.com/v1/hijriCalendarByCity/1445/9?city=Tangerang&country=Indonesia&method=20"
  //       );
  //       setDHijri(response.data.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   getDateHijri();
  // }, []);
  // const removeWIB = (time) => {
  //   return time.split(" (WIB)")[0];
  // };

  return (
    <>
      <h1 className="text-3xl font-bold m-5">Ramadhan 1445 H | 2024 M</h1>
      <div className="overflow-x-auto w-full shadow-md  sm:rounded-lg">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr className="bg-[#273036] text-white font-bold py-2">
              <th>NO</th>
              <th>TANGGAL</th>
              <th>IMSAK</th>
              <th>SUBUH</th>
              <th>DZUHUR</th>
              <th>ASAR</th>
              <th>MAGRIB</th>
              <th>ISYA</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(kalkot[0]).map((key, index) => (
              <tr
                key={index}
                className={
                  moment().add(index, "days").format("YYYY-MM-DD") ==
                  moment().format("YYYY-MM-DD")
                    ? "bg-gray-100"
                    : "bg-white hover"
                }
              >
                <th>{kalkot[0][index].NO}</th>
                <td>{moment().add(index, "days").format("ll")}</td>
                <td>{kalkot[0][index].IMSAK}</td>
                <td>{kalkot[0][index].SUBUH}</td>
                <td>{kalkot[0][index].ZUHUR}</td>
                <td>{kalkot[0][index].ASAR}</td>
                <td className="bg-gray-100">{kalkot[0][index].MAGRIB}</td>
                <td>{kalkot[0][index].ISYA}</td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </>
  );
}

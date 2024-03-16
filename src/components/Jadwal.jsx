/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import moment from "moment";
import kota from "../data/kota";
export default function Jadwal() {
  // eslint-disable-next-line no-unused-vars
  const [kalkot, setKalkot] = useState([kota]);

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
                  moment("2024-03-12")
                    .add(index, "days")
                    .format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")
                    ? "bg-gray-100"
                    : "bg-white hover"
                }
              >
                <th>{kalkot[0][index].NO}</th>
                <td>{moment("2024-03-12").add(index, "days").format("ll")}</td>
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

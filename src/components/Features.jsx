import React, { useEffect, useState } from "react";

export default function CheckProgress() {
  const [puasa, setPuasa] = useState(
    JSON.parse(localStorage.getItem("puasa")) || {}
  );
  const [totalPuasa, setTotalPuasa] = useState(
    JSON.parse(localStorage.getItem("totalPuasa")) || 0
  );
  const [totalTarawih, setTotalTarawih] = useState(
    JSON.parse(localStorage.getItem("totalTarawih")) || 0
  );
  const [totalBquran, setTotalBquran] = useState(
    JSON.parse(localStorage.getItem("totalBquran")) || 0
  );

  // Initialize daysOfRamadhan to 0
  const [totalRamadhan, setTotalRamadhan] = useState(30);

  // Initialize total counts to 0
  const [puasaPercentage, setPuasaPercentage] = useState(0);
  const [tarawihPercentage, setTarawihPercentage] = useState(0);
  const [bquranPercentage, setBquranPercentage] = useState(0);

  const handleCheckboxChange = (event, day) => {
    const newPuasa = { ...puasa };
    const dayObj = newPuasa[`day-${day}`] || {};

    // Update the corresponding checkbox status
    if (event.target.name.startsWith("puasa_")) {
      dayObj.puasa = event.target.checked;
    } else if (event.target.name.startsWith("tarawih_")) {
      dayObj.tarawih = event.target.checked;
    } else if (event.target.name.startsWith("bquran_")) {
      dayObj.bquran = event.target.checked;
    }

    newPuasa[`day-${day}`] = dayObj;
    setPuasa(newPuasa);
    localStorage.setItem("puasa", JSON.stringify(newPuasa));

    // Update total counts
    let updatedTotalPuasa = totalPuasa;
    let updatedTotalTarawih = totalTarawih;
    let updatedTotalBquran = totalBquran;

    if (event.target.name.startsWith("puasa_")) {
      updatedTotalPuasa += event.target.checked ? 1 : -1;
      localStorage.setItem("totalPuasa", JSON.stringify(updatedTotalPuasa));
    } else if (event.target.name.startsWith("tarawih_")) {
      updatedTotalTarawih += event.target.checked ? 1 : -1;
      localStorage.setItem("totalTarawih", JSON.stringify(updatedTotalTarawih));
    } else if (event.target.name.startsWith("bquran_")) {
      updatedTotalBquran += event.target.checked ? 1 : -1;
      localStorage.setItem("totalBquran", JSON.stringify(updatedTotalBquran));
    }

    setTotalPuasa(updatedTotalPuasa);
    setTotalTarawih(updatedTotalTarawih);
    setTotalBquran(updatedTotalBquran);
  };

  useEffect(() => {
    const calculatedPuasaPercentage = (totalPuasa / totalRamadhan) * 100;
    const calculatedTarawihPercentage = (totalTarawih / totalRamadhan) * 100;
    const calculatedBquranPercentage = (totalBquran / totalRamadhan) * 100;
    setPuasaPercentage(calculatedPuasaPercentage);
    setTarawihPercentage(calculatedTarawihPercentage);
    setBquranPercentage(calculatedBquranPercentage);
  }, [totalPuasa, totalTarawih, totalBquran, totalRamadhan]);

  return (
    <div className="overflow-x-auto w-full shadow-md  sm:rounded-lg">
      <h1 className="text-3xl font-bold m-5">Ramadhan Progress</h1>
      <table className="table table-auto shadow-md">
        <thead>
          <tr>
            <th>Hari Ke</th>
            <th className="flex justify-end sm:w-2/3 w-full ">
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: totalRamadhan }, (_, i) => (
            <tr key={i} className="hover">
              <td>Hari Ke-{i + 1}</td>
              <td className="flex justify-between flex-col sm:w-2/3 w-full items-end ">
                <label className="label cursor-pointer">
                  <span className="label-text">Puasa</span>
                  <input
                    type="checkbox"
                    className="checkbox m-3"
                    id={`puasa_${i + 1}`}
                    name={`puasa_${i + 1}`}
                    checked={puasa[`day-${i + 1}`]?.puasa}
                    onChange={(e) => handleCheckboxChange(e, i + 1)}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Tarawih</span>
                  <input
                    type="checkbox"
                    className="checkbox m-3"
                    id={`tarawih_${i + 1}`}
                    name={`tarawih_${i + 1}`}
                    checked={puasa[`day-${i + 1}`]?.tarawih}
                    onChange={(e) => handleCheckboxChange(e, i + 1)}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Baca Quran</span>
                  <input
                    type="checkbox"
                    className="checkbox m-3"
                    id={`bquran_${i + 1}`}
                    name={`bquran_${i + 1}`}
                    checked={puasa[`day-${i + 1}`]?.bquran}
                    onChange={(e) => handleCheckboxChange(e, i + 1)}
                  />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="stats stats-vertical w-full sm:flex mt-5 shadow-md rounded">
        <div className="stat">
          <div className="stat-title">Puasa</div>
          <div className="stat-value">{totalPuasa}</div>
          <div className="stat-percentage">{puasaPercentage.toFixed(2)}%</div>
        </div>
        <div className="stat">
          <div className="stat-title">Tarawih</div>
          <div className="stat-value">{totalTarawih}</div>
          <div className="stat-percentage">{tarawihPercentage.toFixed(2)}%</div>
        </div>
        <div className="stat">
          <div className="stat-title">Baca Quran</div>
          <div className="stat-value">{totalBquran}</div>
          <div className="stat-percentage">{bquranPercentage.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

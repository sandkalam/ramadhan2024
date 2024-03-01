// import momentjs
import moment from "moment";
import "moment/dist/locale/id"; // locale for Indonesia

// add use react functions
import { useEffect, useState } from "react";

import axios from "axios";
import Kartu from "./components/Kartu";
import Carous from "./components/Carous";
import CountD from "./components/CountD";
import Jadwal from "./components/Jadwal";
import umalqura from "@umalqura/core";
import AOS from "aos";
import "aos/dist/aos.css";
// import Track from "./components/Track";
import Customdata from "./data/data";
import imgHeader from "./assets/header.png";
import Footer from "./components/Footer";

// moment setup

// fetch data from api
// http://api.aladhan.com/v1/calendarByCity/:year/:month?city=tangerang&country=id&state=banten

const tahun = moment().format("YYYY");
const bulan = moment().format("MM");
const tanggal = moment().format("DD");
let t = tanggal - 1;
// ---------------------------
export default function App() {
  // get current time using momentjs and use Effect
  const [praytime, setPraytime] = useState({ data: [] });
  const [time, setTime] = useState(moment().format("hh:mm:ss"));
  const [date, setDate] = useState(moment().format("dddd, DD MMMM YYYY"));
  const [hijri, setHijri] = useState(umalqura().format("d MMMM, yyyy") + "H");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(Customdata);

    const getPrayersdata = async () => {
      try {
        const { data: response } = await axios.get(
          `https://api.aladhan.com/v1/calendarByCity/` +
            tahun +
            `/` +
            bulan +
            `?city=Tangerang&country=id&state=Banten&method=20`
        );
        setPraytime(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    getPrayersdata();
    AOS.init();

    const timer = setInterval(() => {
      setTime(moment().format("HH:mm:ss a"));
      setDate(moment().format("dddd, DD MMMM YYYY"));
      setHijri(umalqura().format("d MMMM yyyy") + " H");
    });

    return function cleanup() {
      clearInterval(timer);
    };
  }, [data]);
  // waktu solat
  let fajr = praytime.data?.[t]?.timings?.Fajr;
  let dzuhur = praytime.data?.[t]?.timings?.Dhuhr;
  let asar = praytime.data?.[t]?.timings?.Asr;
  let magrib = praytime.data?.[t]?.timings?.Maghrib;
  let isya = praytime.data?.[t]?.timings?.Isha;

  return (
    <>
      {/* Header */}
      <header className="bg-white w-100">
        <div className="grid sm:grid-cols-2 grid-cols-1 container p-4 gap-4 mx-auto text-center justify-items-center items-center">
          <div className="flex justify-center items-center flex-col p-3">
            <h1 className="sm:text-6xl text-4xl font-bold text-black font-serif ">
              MESTI PUASA
            </h1>
            <p className="sm:text-3xl text-xl text-black font-serif mt-3">
              sat-set.. sat-set.. <span className="font-bold">Kemenangan.</span>
            </p>
            <a
              href="#calendar"
              className="flex justify-start content-start mt-3"
            >
              <button id="btncal" className="btn bg-white shadow-md">
                Lihat Jadwal
              </button>
            </a>
          </div>
          <div>
            <img className="select-none" src={imgHeader} alt="Logo" />
          </div>
          {/* add wave */}
          {/* #273036 color */}
          {/* svg */}
        </div>
      </header>
      {/* Jam */}
      <section
        className="bg-[#273036] py-4 h-[30rem] flex items-center content-center flex-col"
        id="clock"
      >
        <div className="container mx-auto grid grid-cols-1 gap-4 p-4 justify-items-center items-center text-center">
          <div className="flex justify-center content-center flex-col">
            <h1 className="text-xl md:text-4xl uppercase text-white font-bold font-mono">
              {time}
            </h1>
            <h2 className="text-l md:text-2xl uppercase text-white font-mono">
              {date}
            </h2>
            <h2 className="text-l md:text-2xl uppercase text-white font-mono">
              {hijri}
            </h2>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="container grid grid-cols-1 items-center justify-items-center overflow-x-auto"
        >
          {/* time before pray */}
          <h1 className="py-4 uppercase text-white mt-3 font-xl font-bold">
            Waktu Solat dan Matahari:
          </h1>
          <p className="text-white uppercase font-l fonst-bold">
            {/* {praytime.data?.[t]?.meta.latitude}|
            {praytime.data?.[t]?.meta.longitude} */}
            Wilayah Tangerang dan Sekitarnya
          </p>
          <table className="table table-auto border border-slate-400 p-4 text-white text-sm rounded-md border-separate border-spacing-2">
            <thead className="rounded-md">
              <tr className="bg-[#DA604B] text-white uppercase text-center">
                <th className="p-2  rounded-md">Fajr</th>
                <th className="p-2  rounded-md">Dzuhur</th>
                <th className="p-2  rounded-md">Asar</th>
                <th className="p-2  rounded-md">Magrib</th>
                <th className="p-2  rounded-md">Isya</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-1">
                <td className="p-2 text-center">{fajr}</td>
                <td className="p-2 text-center">{dzuhur}</td>
                <td className="p-2 text-center">{asar}</td>
                <td className="p-2 text-center">{magrib}</td>
                <td className="p-2 text-center">{isya}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* Countdown */}
      <section
        id="countdown"
        className="container grid grid-cols-1 items-center justify-items-center mt-3 p-3 overflow-x-auto mx-auto"
      >
        <CountD />
        <p className="uppercase text-xl font-bold font-mono p-4">
          Menuju Puasa Ramadhan
        </p>
      </section>
      {/* TIPS */}
      <section
        id="tips"
        className="bg-white pb-4 print:hidden"
        data-aos="fade-up"
      >
        <div className="sm:container grid grid-cols-1 items-center justify-items-start mx-auto mt-[4rem] bg-[#273036] shadow-sm  rounded-md overlay-scroll">
          <div className="text-xl font-bold  px-4 py-2 mx-4  text-white flex  justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
            <h1 className="mx-3">TIPS :</h1>
          </div>
        </div>
        <div className="container mx-auto md:grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-4 mt-[3rem] p-4 hidden">
          {Object.keys(data).map((dt, index) => (
            // pc
            <div key={index} className="carousel-item w-full">
              <Kartu
                url={data[index].url}
                judul={data[index].judul}
                desc={data[index].desc}
              />
            </div>
          ))}
        </div>
        {/* mobile */}
        <div
          data-aos="fade-up"
          className="container md:hidden mx-auto grid overflow-x-scroll grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-4 mt-[3rem] p-4"
        >
          <Carous />
        </div>
      </section>
      {/* Jadwal */}
      <section
        id="calendar"
        data-aos="fade-up"
        className="sm:container my-4 grid grid-cols-1 items-center justify-items-start mx-auto mt-2 bg-white shadow-sm  rounded-md w-100 overlay-scroll"
      >
        <div className="bg-[#273036] my-4 rounded-md text-xl font-bold  px-4 py-2 mx-4  text-white flex  justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <h1 className="mx-3">Calendar : Ramadhan 2024 M | 1445 H</h1>
        </div>
        <Jadwal />
      </section>
      {/* jelajah */}
      <section
        data-aos="fade-up"
        className="print:hidden sm:container my-4 grid grid-cols-1 items-center justify-items-start mx-auto mt-2 bg-white shadow-sm  rounded-md w-100 overlay-scroll"
      >
        <div className="bg-[#273036] my-4 rounded-md text-xl font-bold  px-4 py-2 mx-4  text-white flex  justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          <h1 className="mx-3">Jelajah</h1>
        </div>
        <h1>On Progress..</h1>
        {/* https://marifa.org/ */}
        {/* https://ilm.islamic.network/items/quotes/71?fields=text,reference,translations.*,author.name */}
        {/* <Track /> */}
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}

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
// add clock elements
// import Clock from "./Elements/Clock.jsx";

// hijri
import umalqura from "@umalqura/core";

import AOS from "aos";
import "aos/dist/aos.css";
import Track from "./components/Track";

import Customdata from "./data/data";

import imgHeader from "./assets/header.png";
// console.log(Customdata);

// moment setup
moment().locale("id");

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
  // prayers times
  // console.log(typeof praytime);
  useEffect(() => {
    setData(Customdata);
    const getPrayersdata = async () => {
      try {
        const { data: response } = await axios.get(
          `http://api.aladhan.com/v1/calendarByCity/` +
            tahun +
            `/` +
            bulan +
            `?city=tangerang&country=id&state=banten&method=20`
        );
        setPraytime(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    getPrayersdata();
    AOS.init();

    // add offsite to #calendar

    const timer = setInterval(() => {
      setTime(moment().format("HH:mm:ss a"));
      setDate(moment().format("dddd, DD MMMM YYYY"));
      setHijri(umalqura().format("d MMMM yyyy") + " H");
    });

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);
  // waktu solat
  let fajr = praytime.data?.[t]?.timings?.Fajr;
  let imsak = praytime.data?.[t]?.timings?.Imsak;
  let sunrise = praytime.data?.[t]?.timings?.Sunrise;
  let dzuhur = praytime.data?.[t]?.timings?.Dhuhr;
  let asar = praytime.data?.[t]?.timings?.Asr;
  let magrib = praytime.data?.[t]?.timings?.Maghrib;
  let isya = praytime.data?.[t]?.timings?.Isha;
  // let midnight = praytime.data?.[t]?.timings?.Midnight;
  return (
    <>
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
              <button id="btncal" className="btn bg-white shadow-sm">
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
        <div className="w-100 relative bottom-0 left-0">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#273036"
              fillOpacity="1"
              d="M0,192L30,160C60,128,120,64,180,58.7C240,53,300,107,360,144C420,181,480,203,540,202.7C600,203,660,181,720,181.3C780,181,840,203,900,208C960,213,1020,203,1080,181.3C1140,160,1200,128,1260,128C1320,128,1380,160,1410,176L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            ></path>
          </svg> */}
        </div>
      </header>
      <section
        className="bg-[#273036] py-4 h-[30rem] flex items-center content-center flex-col"
        id="clock"
      >
        <div className="container mx-auto grid grid-cols-1 gap-4 p-4 justify-items-center items-center text-center">
          {/* <div id="clock" className="flex justify-center content-center w-1/2">
            <Clock />
          </div> */}
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
          className="container sm:mx-auto grid grid-cols-1 items-center justify-items-center overflow-x-auto"
        >
          {/* time before pray */}
          <h1 className="py-4 uppercase text-white mt-3 font-xl font-bold">
            Waktu Solat dan Matahari:
          </h1>
          {/* table for pray time */}
          {/* <div> */}
          <table className="table table-auto border border-slate-400 p-4 text-white text-sm rounded-md border-separate border-spacing-2">
            <thead className="rounded-md">
              <tr className="bg-[#DA604B] text-white uppercase text-center">
                <th className="p-2  rounded-md">Imsak</th>
                <th className="p-2  rounded-md">Fajr</th>
                <th className="p-2  rounded-md">Terbit</th>
                <th className="p-2  rounded-md">Dzuhur</th>
                <th className="p-2  rounded-md">Asar</th>
                <th className="p-2  rounded-md">Magrib</th>
                <th className="p-2  rounded-md">Isya</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-1">
                <td className="p-2 text-center">{imsak}</td>
                <td className="p-2 text-center">{fajr}</td>
                <td className="p-2 text-center">{sunrise}</td>
                <td className="p-2 text-center">{dzuhur}</td>
                <td className="p-2 text-center">{asar}</td>
                <td className="p-2 text-center">{magrib}</td>
                <td className="p-2 text-center">{isya}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </section>
      <section
        id="countdown"
        className="container grid grid-cols-1 items-center justify-items-center mt-3 p-3 overflow-x-auto mx-auto"
      >
        <CountD />
        <p className="uppercase text-xl font-bold font-mono p-4">
          Menuju Puasa Ramadhan
        </p>
      </section>
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
            <div key={index} className="carousel-item w-full">
              <Kartu
                url={data[index].url}
                judul={data[index].judul}
                desc={data[index].desc}
              />
            </div>
          ))}
        </div>
        <div
          data-aos="fade-up"
          className="container md:hidden block mx-auto grid overflow-x-scroll grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-4 mt-[3rem] p-4"
        >
          <Carous />
        </div>
      </section>

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
      <section
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

          <h1 className="mx-3">Jelajah</h1>
        </div>

        <Track />
      </section>

      {/* footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content print:hidden">
        <aside>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#067ACC"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>

          <p>
            Sandy Kalamuddin.
            <br />
            Merdeka sejak 1945.
          </p>
          <p>Sumber : aladhan.com | Kementerian Agama Republik Indonesia</p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/sandkalam">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://github.com/sandkalam">
              <svg
                height="24"
                viewBox="0 0 1792 1792"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M1664 896q0 251-146.5 451.5t-378.5 277.5q-27 5-39.5-7t-12.5-30v-211q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-121-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-86-13.5q-44 113-7 204-79 85-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-40 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 89t.5 54q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/sendi.kalamudin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}

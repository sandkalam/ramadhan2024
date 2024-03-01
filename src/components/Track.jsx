import { useState } from "react";

export default function Track() {
  const [inputValue, setInputValue] = useState("");

  const saveProgramPuasa = (programPuasa) => {
    let programs = [];
    if (localStorage.getItem("programs")) {
      programs = JSON.parse(localStorage.getItem("programs"));
    }
    programs.push(programPuasa);
    localStorage.setItem("programs", JSON.stringify(programs));
  };

  const fetchProgramsPuasa = () => {
    if (localStorage.getItem("programs")) {
      return JSON.parse(localStorage.getItem("programs"));
    }
    return [];
  };

  const updateProgramPuasa = (index, newProgram) => {
    const programs = fetchProgramsPuasa();
    programs[index] = newProgram;
    localStorage.setItem("programs", JSON.stringify(programs));
  };

  const deleteProgramPuasa = (index) => {
    const programs = fetchProgramsPuasa();
    programs.splice(index, 1);
    localStorage.setItem("programs", JSON.stringify(programs));
  };

  return (
    <>
      <div className="grid grid-cols-2 items-center content-center gap-x-4 w-full shadow-md rounded-sm p-4">
        <div className="w-full">
          {/* Program puasa */}
          {/* make crud about program puasa, stored in localstorage with daisyui css */}
          <form
            className="flex flex-col gap-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              saveProgramPuasa(inputValue);
              setInputValue("");
            }}
          >
            <label htmlFor="program_puasa" className="font-semibold text-lg">
              Program Puasa:{" "}
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="program_puasa"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
        <div className="shadow-md">
          <div className="flex items-center gap-x-2">
            <table className="table table-auto">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Program</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchProgramsPuasa().map((program, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{program}</td>
                    <td className="grid grid-cols-2 items-center">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => updateProgramPuasa(index, inputValue)}
                      >
                        Ubah
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => deleteProgramPuasa(index)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

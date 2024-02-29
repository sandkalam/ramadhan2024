export default function Kartu(params) {
  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl hover:scale-110 ease-in-out duration-300">
        <figure>
          <img src={params.url} alt="img" />
        </figure>
        <div className="card-body">
          <h2 className="card-title"> {params.judul}</h2>
          <p>{params.desc}</p>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary"></button> */}
          </div>
        </div>
      </div>
    </>
  );
}

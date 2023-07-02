import React from 'react';
import { Link } from 'react-router-dom';

const Jumbotron = () => {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVyYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')",
        height: '100vh',
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-white">
            <h2 className="mb-4 text-4xl font-semibold">Quran</h2>
            <h4 className="mb-6 text-xl font-semibold">
              Sudahkan anda membaca hari ini ?
            </h4>
            <Link to={'/listquran'}>
              <button
                type="button"
                className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                recite Quran
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

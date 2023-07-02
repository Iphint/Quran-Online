/* eslint-disable jsx-a11y/anchor-is-valid */
import Quran from '../images/quran.png';
import { Popover } from '@headlessui/react';

export default function Example() {
  return (
    <header className="bg-gray-700">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex justify-center items-center">
            <img className="h-8 w-auto" src={Quran} alt="" />
            <p className='text-white'>Al - Qur'an online</p>
          </a>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-white">
            Baca Quran Online
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>
    </header>
  );
}

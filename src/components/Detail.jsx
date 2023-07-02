import React, { useState, useEffect } from 'react';
import '../styles/audio.css';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [searchAyahKeyword, setSearchAyahKeyword] = useState('');

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch(
          'https://quran-api.santrikoding.com/api/surah'
        );
        const data = await response.json();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
    };

    fetchSurahs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSurahClick = async (surahNumber) => {
    try {
      const response = await fetch(
        `https://quran-api.santrikoding.com/api/surah/${surahNumber}`
      );
      const data = await response.json();
      setSelectedSurah(data);
      setIsDescriptionExpanded(false);
      setSearchAyahKeyword('');
    } catch (error) {
      console.error('Error fetching surah:', error);
    }
  };

  const handlePreviousSurah = async () => {
    const currentSurahNumber = selectedSurah.nomor;
    const nextSurahNumber = currentSurahNumber - 1;

    try {
      const response = await fetch(
        `https://quran-api.santrikoding.com/api/surah/${nextSurahNumber}`
      );
      const data = await response.json();
      setSelectedSurah(data);
      setIsDescriptionExpanded(false);
      setSearchAyahKeyword('');
    } catch (error) {
      console.error('Error fetching next surah:', error);
    }
  };
  const handleNextSurah = async () => {
    const currentSurahNumber = selectedSurah.nomor;
    const nextSurahNumber = currentSurahNumber + 1;

    try {
      const response = await fetch(
        `https://quran-api.santrikoding.com/api/surah/${nextSurahNumber}`
      );
      const data = await response.json();
      setSelectedSurah(data);
      setIsDescriptionExpanded(false);
      setSearchAyahKeyword('');
    } catch (error) {
      console.error('Error fetching next surah:', error);
    }
  };

  const toggleDescriptionExpansion = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const filteredSurahs = surahs.filter((surat) => {
    const searchNumber = parseInt(searchKeyword, 10);
    const surahNumber = parseInt(surat.nomor, 10);

    if (isNaN(searchNumber)) {
      return (
        surat.arti.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        surat.nama_latin.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    } else {
      return surahNumber === searchNumber;
    }
  });

  const isSearchEmpty = searchKeyword !== '' && filteredSurahs.length === 0;

  const isSurahSelected = selectedSurah !== null;

  const filteredAyat = selectedSurah?.ayat.filter((ayat) => {
    const searchKeyword = searchAyahKeyword.toLowerCase();
    return ayat.nomor.toString().includes(searchKeyword);
  });

  return (
    <div>
      {isSurahSelected ? (
        <div className="mt-4">
          <button
            className="hover:text-red-500 flex"
            onClick={() => setSelectedSurah(null)}
          >
            <span aria-hidden="true">&larr;</span> kembali
          </button>
          <input
            type="text"
            placeholder="Cari ayat ..."
            value={searchAyahKeyword}
            onChange={(event) => setSearchAyahKeyword(event.target.value)}
            className="p-2 mb-4 mt-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex justify-between">
            <button
              className="p-2 hover:text-orange-600 text-black"
              onClick={handlePreviousSurah}
            >
              <span aria-hidden="true">&larr;</span> previous
            </button>
            <button
              className="p-2 hover:text-green-500 text-black"
              onClick={handleNextSurah}
            >
              next <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
          <div className="block rounded-lg my-4 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="flex justify-between">
              <div className="">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {selectedSurah.nama}
                </h5>
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  tempat turun : {selectedSurah.tempat_turun}
                </h5>
                <audio controls className="w-full mt-2 audio-player">
                  <source src={selectedSurah.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Q.S {selectedSurah.nama_latin}
              </h5>
            </div>
            <p
              className={`mb-4 mt-5 text-base text-neutral-600 dark:text-neutral-200 ${
                isDescriptionExpanded ? '' : 'line-clamp-2'
              }`}
              style={{ WebkitLineClamp: isDescriptionExpanded ? 'none' : 3 }}
              dangerouslySetInnerHTML={{ __html: selectedSurah.deskripsi }}
              onClick={toggleDescriptionExpansion}
            ></p>
          </div>
          {filteredAyat.map((ayat) => (
            <div
              key={ayat.id}
              className="my-4 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <p className="text-sm text-gray-500 mb-2">
                {ayat.surah} : {ayat.nomor}
              </p>
              <div className="flex justify-end">
                <p
                  className="text-2xl text-bold"
                  style={{ fontFamily: 'Arabic Font', fontSize: '24px' }}
                >
                  {ayat.ar}
                </p>
              </div>
              <p className="text-lg mb-2 flex justify-end my-5">
                <span
                  className="text-base"
                  dangerouslySetInnerHTML={{ __html: ayat.tr }}
                ></span>
              </p>
              <p className="text-sm font-medium">{ayat.idn}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Cari surat berdasarkan no surat / nama surat ..."
            value={searchKeyword}
            onChange={handleSearchChange}
            className="p-2 mb-4 mt-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {isSearchEmpty ? (
            <div className="text-center">Daftar surah tidak ditemukan.</div>
          ) : (
            <div className="flex flex-wrap cursor-pointer">
              {filteredSurahs.map((surat, i) => (
                <div
                  key={surat.nomor}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
                  onClick={() => handleSurahClick(surat.nomor)}
                >
                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="flex justify-between">
                        <div className="mb-5">{i + 1}</div>
                        <div className="mb-5">No surah {surat.nomor}</div>
                      </div>
                      <div className="flex justify-around">
                        <div
                          className="font-bold text-xl mb-2"
                          style={{
                            fontFamily: 'Arabic Font',
                            fontSize: '24px',
                          }}
                        >
                          {surat.nama}
                        </div>
                        <div className="text-gray-500 text-xl mb-2">
                          {surat.nama_latin}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurahList;

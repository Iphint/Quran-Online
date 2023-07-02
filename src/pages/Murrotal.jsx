import React, { useEffect, useState } from 'react';

const Murrotal = () => {
  const [surahs, setSurahs] = useState([]);

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

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <h1 className="text-2xl font-bold mb-4 col-span-full">Murrotal</h1>
      {surahs &&
        surahs.map((surah) => (
          <div key={surah.nomor} className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{surah.nama}</h3>
            <audio src={surah.audio} controls className="w-full"></audio>
          </div>
        ))}
    </div>
  );
};

export default Murrotal;

import React, { useEffect, useState, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const GenderCharts = () => {
  const [chartData, setChartData] = useState({
    totalSiswa: [],
    siswaLaki: [],
    siswaPerempuan: [],
    jurusan: []
  });

  // Optimasi dengan useCallback agar tidak membuat fungsi baru setiap render
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      // Panggil API akun karena API user/data_diri belum ada
      const akunResponse = await axios.get('http://localhost:8080/admin/akun', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const siswa = akunResponse.data;

      console.log("API Dipanggil: http://localhost:8080/admin/akun");
      console.log("Data Siswa dari API:", siswa);

      // Validasi data dari API
      if (!Array.isArray(siswa) || siswa.length === 0) {
        console.warn("⚠ API tidak mengembalikan data valid. Menggunakan data dummy.");
        return;
      }

      // Buat map untuk menghitung jumlah siswa per jurusan
      const jurusanMap = {};
      siswa.forEach(s => {
        if (!s.jurusan) {
          console.warn(`⚠ Data siswa tanpa jurusan: ${s.nama} (ID: ${s.id})`);
          return;
        }

        if (!s.jenis_kelamin) {
          console.warn(`⚠ Data siswa tanpa jenis kelamin: ${s.nama} (ID: ${s.id})`);
          s.jenis_kelamin = "laki-laki";
        }

        if (!jurusanMap[s.jurusan]) {
          jurusanMap[s.jurusan] = { laki: 0, perempuan: 0, total: 0 };
        }

        if (s.jenis_kelamin.toLowerCase() === "laki-laki") {
          jurusanMap[s.jurusan].laki++;
        } else if (s.jenis_kelamin.toLowerCase() === "perempuan") {
          jurusanMap[s.jurusan].perempuan++;
        } else {
          console.warn(`⚠ Jenis kelamin tidak dikenali: ${s.jenis_kelamin} untuk ${s.nama}`);
        }

        jurusanMap[s.jurusan].total++;
      });

      console.log("Data yang akan masuk ke Chart:", jurusanMap);

      const jurusanLabels = Object.keys(jurusanMap);
      const lakiData = jurusanLabels.map(j => jurusanMap[j].laki);
      const perempuanData = jurusanLabels.map(j => jurusanMap[j].perempuan);
      const totalData = jurusanLabels.map(j => jurusanMap[j].total);

      setChartData({
        totalSiswa: totalData,
        siswaLaki: lakiData,
        siswaPerempuan: perempuanData,
        jurusan: jurusanLabels
      });

    } catch (error) {
      console.error('❌ Error fetching data:', error);
      console.warn("⚠ Menggunakan data dummy sementara karena API tidak tersedia.");

      const dummyData = {
        "Teknik Komunikasi Jaringan": { laki: 3, perempuan: 0, total: 3 },
        "Animasi": { laki: 1, perempuan: 1, total: 2 },
        "Rekayasa Perangkat Lunak": { laki: 6, perempuan: 0, total: 6 }
      };

      const jurusanLabels = Object.keys(dummyData);
      const lakiData = jurusanLabels.map(j => dummyData[j].laki);
      const perempuanData = jurusanLabels.map(j => dummyData[j].perempuan);
      const totalData = jurusanLabels.map(j => dummyData[j].total);

      setChartData({
        totalSiswa: totalData,
        siswaLaki: lakiData,
        siswaPerempuan: perempuanData,
        jurusan: jurusanLabels
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const commonOptions = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
      }
    },
    colors: ['rgb(0, 102, 204)', 'rgb(0, 204, 102)', 'rgb(255, 77, 77)'],
    xaxis: { categories: chartData.jurusan },
    yaxis: { title: { text: 'Jumlah Siswa' } },
    legend: { position: 'bottom' },
    tooltip: { theme: 'dark' }
  };

  const chartSeries = [
    { name: 'Total Siswa', data: chartData.totalSiswa },
    { name: 'Siswa Laki-laki', data: chartData.siswaLaki },
    { name: 'Siswa Perempuan', data: chartData.siswaPerempuan }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold mb-4">Distribusi Siswa per Jurusan</h3>
        <ReactApexChart
          options={{
            ...commonOptions,
            chart: { 
              ...commonOptions.chart,
              type: 'bar',
            },
            plotOptions: { bar: { columnWidth: '45%', borderRadius: 5 } }
          }}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold mb-4">Tren Distribusi Siswa</h3>
        <ReactApexChart
          options={{
            ...commonOptions,
            chart: {
              ...commonOptions.chart,
              type: 'area',
            },
            stroke: { curve: 'smooth', width: 2 }
          }}
          series={chartSeries}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default GenderCharts;
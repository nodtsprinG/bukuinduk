import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const GenderCharts = () => {
  const [chartData, setChartData] = useState({
    totalSiswa: [],
    siswaLaki: [],
    siswaPerempuan: [],
    tahunAngkatan: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Ambil data siswa dan jurusan
      const [akunResponse, jurusanResponse] = await Promise.all([
        axios.get('http://localhost:8080/admin/akun', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:8080/admin/jurusan', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const siswa = akunResponse.data;  // Data siswa dari API
      const jurusan = jurusanResponse.data; // Data jurusan dari API

      // Kelompokkan jumlah siswa berdasarkan jurusan dan jenis kelamin
      const siswaPerJurusan = jurusan.map((jrs) => {
        const siswaJurusan = siswa.filter((s) => s.jurusan_id === jrs.id);
        const jumlahLaki = siswaJurusan.filter((s) => s.jenis_kelamin === "laki-laki").length;
        const jumlahPerempuan = siswaJurusan.filter((s) => s.jenis_kelamin === "perempuan").length;

        return {
          jurusan: jrs.nama,
          laki: jumlahLaki,
          perempuan: jumlahPerempuan,
          total: jumlahLaki + jumlahPerempuan
        };
      });

      // Update state chartData
      setChartData({
        totalSiswa: siswaPerJurusan.map((j) => j.total),
        siswaLaki: siswaPerJurusan.map((j) => j.laki),
        siswaPerempuan: siswaPerJurusan.map((j) => j.perempuan),
        jurusan: siswaPerJurusan.map((j) => j.jurusan),
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const commonOptions = {
    chart: {
      toolbar: { show: true },
      animations: { enabled: true, easing: 'easeinout', speed: 800 }
    },
    colors: ['#bf00ff', '#00E396', '#FF4560'],
    xaxis: { categories: chartData.jurusan },
    yaxis: { title: { text: 'Jumlah Siswa' } },
    legend: { position: 'bottom' },
    grid: { borderColor: '#e0e0e0', strokeDashArray: 5 },
    tooltip: { theme: 'dark', style: { fontSize: '12px' } }
  };

  const chartSeries = [
    { name: 'Total Siswa', data: chartData.totalSiswa },
    { name: 'Siswa Laki-laki', data: chartData.siswaLaki },
    { name: 'Siswa Perempuan', data: chartData.siswaPerempuan }
  ];


  const barChartOptions = {
    ...commonOptions,
    chart: { ...commonOptions.chart, type: 'bar' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 5 } },
    dataLabels: { enabled: true, style: { fontSize: '12px', colors: ['#fff'] } }
  };

  const lineChartOptions = {
    ...commonOptions,
    chart: { ...commonOptions.chart, type: 'area' },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3, stops: [0, 90, 100] } }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
        <ReactApexChart options={barChartOptions} series={chartSeries} type="bar" height={350} />
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
        <ReactApexChart options={lineChartOptions} series={chartSeries} type="area" height={350} />
      </div>
    </div>
  );
};

export default GenderCharts;
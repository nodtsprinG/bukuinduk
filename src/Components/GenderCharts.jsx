import React, { useEffect, useState, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const GenderCharts = () => {
  const [chartData, setChartData] = useState({ totalSiswa: [], jurusan: [] });
  const [jurusanColors, setJurusanColors] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch data siswa
      const akunResponse = await axios.get('http://localhost:8080/admin/akun', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const siswa = akunResponse.data;

      if (!Array.isArray(siswa) || siswa.length === 0) {
        console.warn("⚠ API tidak mengembalikan data valid.");
        return;
      }

      // Fetch daftar jurusan
      const jurusanResponse = await axios.get('http://localhost:8080/admin/jurusan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const daftarJurusan = jurusanResponse.data;

      // Generate distinct colors for each jurusan
      const colors = {};

      const jurusanColors = {
        "Rekayasa Perangkat Lunak": "#FC8A31",    // Warna untuk Rekayasa Perangkat Lunak
        "Desain Komunikasi Visual": "#1C87D6",    // Warna untuk Teknik Komputer & Jaringan
        "Audio Video": "#62BB51",
        "Broadcasting": "#E04F52",
        "Animasi": "#D94B98",
        "Teknik Komunikasi Jaringan": "#FECC2C",
        "Elektronika Industri": "#009253",
        "Mekatronika": "#0B4C0C",
      };

      const getColorByJurusanName = (jurusanName) => {
        // Create a hash from the jurusan name to consistently map to a color
        let hash = 0;
        for (let i = 0; i < jurusanName.length; i++) {
          hash = jurusanName.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const colorPalette = [
          '#000000', '#F68D2D', '#FFCE56', '#4BC0C0', '#FF0000', 
          '#FF9F40', '#8AC24A', '#EA5F89'
        ];
        
        // Use absolute value and modulo to get a consistent index
        const index = Math.abs(hash) % colorPalette.length;
        return colorPalette[index];
      };
      
      // Then in your fetchData function:
      daftarJurusan.forEach((jurusan) => {
        colors[jurusan.nama] = jurusanColors[jurusan.nama] || getColorByJurusanName(jurusan.nama);
      });

      // Count students per jurusan
      const jurusanMap = {};
      siswa.forEach(s => {
        if (!s.jurusan) return;
        if (!jurusanMap[s.jurusan]) {
          jurusanMap[s.jurusan] = 0;
        }
        jurusanMap[s.jurusan]++;
      });

      const jurusanLabels = Object.keys(jurusanMap);
      const totalData = jurusanLabels.map(j => jurusanMap[j]);

      setJurusanColors(colors);
      setChartData({ 
        totalSiswa: totalData, 
        jurusan: jurusanLabels 
      });
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
    },
    plotOptions: {
      bar: { 
        columnWidth: '45%', 
        borderRadius: 4,
        distributed: true // This makes each bar have its own color
      }
    },
    colors: chartData.jurusan.map(j => jurusanColors[j] || '#CCCCCC'),
    xaxis: { 
      categories: chartData.jurusan,
      labels: {
        style: {
          colors: chartData.jurusan.map(j => jurusanColors[j] || '#000000'),
          fontSize: '12px'
        }
      }
    },
    yaxis: { 
      title: { 
        text: 'Jumlah Siswa',
        style: {
          fontSize: '14px'
        }
      } 
    },
    legend: { 
      show: false // We don't need legend since colors are distinct per bar
    },
    tooltip: { 
      theme: 'light',
      style: {
        fontSize: '14px'
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000000']
      }
    }
  };

  const chartSeries = [{
    name: 'Jumlah Siswa',
    data: chartData.totalSiswa
  }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold mb-4">Distribusi Siswa per Jurusan</h3>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default GenderCharts;
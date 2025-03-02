import axios from "axios";
import resetAll from "./resetAll";


const detailPreparing = (id) => {
  axios
    .get(`http://localhost:8080/data-diri/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const data = res.data;
      console.log(data); // Log data untuk memastikan isinya benar

      resetAll();

      localStorage.setItem("akun-nisn", data.nisn)
      localStorage.setItem("akun-jurusanId", data.jurusan_id)
      localStorage.setItem("akun-angkatanId", data.angkatan_id)

      localStorage.setItem("biodata-nama", data.data_diri.nama_lengkap);
      localStorage.setItem("biodata-panggilan", data.data_diri.nama_panggilan);
      localStorage.setItem(
        "biodata-jeniskelamin",
        data.data_diri.jenis_kelamin
      );
      localStorage.setItem("biodata-tempatlahir", data.data_diri.tempat_lahir);
      localStorage.setItem(
        "biodata-tanggallahir",
        data.data_diri.tanggal_lahir  === "0000-00-00"  || null ? new Date : data.data_diri.tanggal_lahir
      );
      localStorage.setItem("biodata-agama", data.data_diri.agama);
      localStorage.setItem(
        "biodata-kewarganegaraan",
        data.data_diri.kewarganegaraan
      );
      localStorage.setItem("biodata-anakke", data.data_diri.anak_ke);
      localStorage.setItem(
        "biodata-kandung",
        data.data_diri.jml_saudara_kandung
      );
      localStorage.setItem("biodata-angkat", data.data_diri.jml_saudara_angkat);
      localStorage.setItem("biodata-tiri", data.data_diri.jml_saudara_tiri);
      localStorage.setItem("biodata-status", data.data_diri.kelengkapan_ortu);
      localStorage.setItem("biodata-bahasa", data.data_diri.bahasa_sehari_hari);

      localStorage.setItem("hobi-kesenian", data.hobi_siswa.kesenian);
      localStorage.setItem("hobi-olahraga", data.hobi_siswa.olahraga);
      localStorage.setItem("hobi-organisasi", data.hobi_siswa.organisasi);
      localStorage.setItem("hobi-lainlain", data.hobi_siswa.lain_lain);

      localStorage.setItem("ayah-nama", data.ayah_kandung.nama);
      localStorage.setItem("ayah-tempatlahir", data.ayah_kandung.tempat_lahir);
      localStorage.setItem(
        "ayah-tanggallahir",
        data.ayah_kandung.tanggal_lahir  === "0000-00-00"  || null ? new Date : data.ayah_kandung.tanggal_lahir
      );
      localStorage.setItem("ayah-agama", data.ayah_kandung.agama);
      localStorage.setItem(
        "ayah-kewarganegaraan",
        data.ayah_kandung.kewarganegaraan
      );
      localStorage.setItem("ayah-pendidikan", data.ayah_kandung.pendidikan);
      localStorage.setItem("ayah-pekerjaan", data.ayah_kandung.pekerjaan);
      localStorage.setItem(
        "ayah-pengeluaran",
        data.ayah_kandung.pengeluaran_per_bulan
      );
      localStorage.setItem(
        "ayah-alamatdantelpon",
        data.ayah_kandung.alamat_dan_no_telepon
      );
      localStorage.setItem("ayah-status", data.ayah_kandung.status);

      localStorage.setItem("ibu-nama", data.ibu_kandung.nama);
      localStorage.setItem("ibu-tempatlahir", data.ibu_kandung.tempat_lahir);
      localStorage.setItem("ibu-tanggallahir", data.ibu_kandung.tanggal_lahir === "0000-00-00"  || null ? new Date : data.ibu_kandung.tanggal_lahir);
      localStorage.setItem("ibu-agama", data.ibu_kandung.agama);
      localStorage.setItem(
        "ibu-kewarganegaraan",
        data.ibu_kandung.kewarganegaraan
      );
      localStorage.setItem("ibu-pendidikan", data.ibu_kandung.pendidikan);
      localStorage.setItem("ibu-pekerjaan", data.ibu_kandung.pekerjaan);
      localStorage.setItem(
        "ibu-pengeluaran",
        data.ibu_kandung.pengeluaran_per_bulan
      );
      localStorage.setItem(
        "ibu-alamatdantelpon",
        data.ibu_kandung.alamat_dan_no_telepon
      );
      localStorage.setItem("ibu-status", data.ibu_kandung.status);

      localStorage.setItem("wali-nama", data.wali.nama ? data.wali.nama : null);
      localStorage.setItem("wali-tempatlahir", data.wali.tempat_lahir ? data.wali.tempat_lahir : null);
      localStorage.setItem("wali-tanggallahir", data.wali.tanggal_lahir === "0000-00-00"  || null ? new Date : data.wali.tanggal_lahir);
      localStorage.setItem("wali-agama", data.wali.agama ? data.wali.agama : null);
      localStorage.setItem("wali-kewarganegaraan", data.wali.kewarganegaraan ? data.wali.kewarganegaraan : null);
      localStorage.setItem("wali-pendidikan", data.wali.pendidikan ? data.wali.pendidikan : null);
      localStorage.setItem("wali-pekerjaan", data.wali.pekerjaan ? data.wali.pekerjaan : null);
      localStorage.setItem("wali-pengeluaran", data.wali.pengeluaran_per_bulan ? data.wali.pengeluaran_per_bulan : null);
      localStorage.setItem(
        "wali-alamatdantelpon",
        data.wali.alamat_dan_no_telepon
      );

      localStorage.setItem("tempattinggal-alamat", data.tempat_tinggal.alamat);
      localStorage.setItem(
        "tempattinggal-telp",
        data.tempat_tinggal.no_telepon
      );
      localStorage.setItem(
        "tempattinggal-tinggal",
        data.tempat_tinggal.tinggal_dengan
      );
      localStorage.setItem(
        "tempattinggal-jarak",
        data.tempat_tinggal.jarak_ke_sekolah
      );

      localStorage.setItem(
        "pendidikan-tanggal",
        data.pendidikan.diterima_tanggal
      );
      localStorage.setItem(
        "pendidikan-tamatan",
        data.pendidikan.sebelumnya_tamatan_dari
      );
      localStorage.setItem(
        "pendidikan-nomorijazah",
        data.pendidikan.sebelumnya_tanggal_dan_ijazah ? data.pendidikan.sebelumnya_tanggal_dan_ijazah : null
      );
      localStorage.setItem(
        "pendidikan-skhun",
        data.pendidikan.sebelumnya_tanggal_skhun_dan_
      );
      localStorage.setItem(
        "pendidikan-sebelumnyalamabelajar",
        data.pendidikan.sebelumnya_lama_belajar ? data.pendidikan.sebelumnya_lama_belajar : null
      );
      localStorage.setItem(
        "pendidikan-darisekolah",
        data.pendidikan.pindahan_dari_sekolah ? data.pendidikan.pindahan_dari_sekolah : null
      );
      localStorage.setItem(
        "pendidikan-alasan",
        data.pendidikan.pindahan_alasan ? data.pendidikan.pindahan_alasan : null
      );
      localStorage.setItem(
        "pendidikan-bidangkeahlian",
        data.pendidikan.diterima_di_bidang_keahlian ? data.pendidikan.diterima_di_bidang_keahlian : null
      );
      localStorage.setItem(
        "pendidikan-programkeahlian",
        data.pendidikan.diterima_di_program_keahlian
      );
      localStorage.setItem(
        "pendidikan-paketkeahlian",
        data.pendidikan.diterima_di_paket_keahlian
      );
      localStorage.setItem(
        "pendidikan-kelas",
        data.pendidikan.diterima_di_kelas ? data.pendidikan.diterima_di_kelas : null
      );

      localStorage.setItem(
        "kesehatan-goldarah", data.kesehatan.gol_darah ? data.kesehatan.gol_darah : null);
      localStorage.setItem(
        "kesehatan-penyakit",
        data.kesehatan.penyakit_pernah_diderita ? data.kesehatan.penyakit_pernah_diderita : null
      );
      localStorage.setItem(
        "kesehatan-jasmani",
        data.kesehatan.kelainan_jasmani ? data.kesehatan.kelainan_jasmani : null
      );
      localStorage.setItem(
        "kesehatan-tinggi", 
        data.kesehatan.tinggi ? data.kesehatan.tinggi : null
      );
      localStorage.setItem(
        "kesehatan-berat", 
        data.kesehatan.berat_badan ? data.kesehatan.berat_badan : null
      );
      localStorage.setItem(
        "selesaipendidikan-melanjutkan",
        data.setelah_pendidikan.melanjutkan_ke ? data.setelah_pendidikan.melanjutkan_ke : null
      );
      localStorage.setItem(
        "selesaipendidikan-perusahaan",
        data.setelah_pendidikan.bekerja_nama_perusahaan ? data.setelah_pendidikan.bekerja_nama_perusahaan : null
      );
      localStorage.setItem(
        "selesaipendidikan-tanggal",
        data.setelah_pendidikan.bekerja_tanggal_mulai === "0000-00-00" || null ? new Date() : data.setelah_pendidikan.bekerja_tanggal_mulai
      );
      localStorage.setItem(
        "selesaipendidikan-penghasilan",
        data.setelah_pendidikan.bekerja_penghasilan ? data.setelah_pendidikan.bekerja_penghasilan : null
      );
      localStorage.setItem(
        "perkembangan-beasiswa",
        data?.perkembangan?.menerima_bea_siswa_tahun_kelas_dari ? data.perkembangan.menerima_bea_siswa_tahun_kelas_dari : null
      );
      localStorage.setItem(
        "perkembangan-meninggalkansekolah",
        data?.perkembangan?.meninggalkan_sekolah_ini_alasan ? data.perkembangan.meninggalkan_sekolah_ini_alasan : null
      );
      localStorage.setItem(
        "perkembangan-akhirpendidikan",
        data?.perkembangan?.akhir_pendidikan_tamat_belajar_lulus_tahun ? data.perkembangan.akhir_pendidikan_tamat_belajar_lulus_tahun : null
      );

      return true;
    })
    .catch((err) => {
      console.error(err); // Log error untuk debugging
      return false;
    });
};

export default detailPreparing;

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export const TextInput = ({ onChange, value, placeholder = "Masukkan teks..." }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-full rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
      type="text"
    />
  );
};

export const IntegerInput = ({ onChange, value, placeholder = "0" }) => {
  return (
    <input
      value={value === null ? "" : value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-white border text-center border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[25%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
      type="number"
    />
  );
};

export const RadioInput = ({ onChange, value }) => {
  return (
    <div className="flex w-full space-x-6 text-lg">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          value="laki-laki"
          onChange={onChange}
          checked={value === "laki-laki"}
          className="hidden"
          type="radio"
          name="gender"
        />
        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${value === "laki-laki" ? "border-blue-600" : "border-gray-400"}`}>
          {value === "laki-laki" && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
        </div>
        <span>Laki-laki</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          value="perempuan"
          onChange={onChange}
          checked={value === "perempuan"}
          className="hidden"
          type="radio"
          name="gender"
        />
        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${value === "perempuan" ? "border-pink-600" : "border-gray-400"}`}>
          {value === "perempuan" && <div className="w-3 h-3 bg-pink-600 rounded-full"></div>}
        </div>
        <span>Perempuan</span>
      </label>
    </div>
  );
};
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    I N P U T _ C O M P O N E N T
  >> Developed By. Ananda Eka <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

export const TextInput = ({ onChange, value }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
      type="text"
    />
  );
};

export const IntegerInput = ({ onChange, value }) => {
  return (
    <input
      value={value === null ? "" : value}
      onChange={onChange}
      allowNull={true}
      className="bg-[#DEE0E1] py-2 px-2 w-[50%] focus:outline-none rounded-[10px]"
      type="number"
    />
  );
};

export const RadioInput = ({ onChange, value }) => {
  return (
    <div className="flex w-full space-x-4 text-[24px]">
      <div className="flex items-center">
        <input
          value={"laki-laki"}
          onChange={onChange}
          checked={value === "laki-laki"}
          className="bg-[#DEE0E1] py-2 px-2 rounded-lg transform scale-150"
          type="radio"
          name="gender"
        />
        <p className="ml-2">Laki-laki</p>
      </div>
      <div className="flex items-center">
        <input
          value={"perempuan"}
          onChange={onChange}
          checked={value === "perempuan"}
          className="bg-[#DEE0E1] py-2 px-2 rounded-lg transform scale-150"
          type="radio"
          name="gender"
        />
        <p className="ml-2">Perempuan</p>
      </div>
    </div>
  );
};

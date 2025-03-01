const AppointmentForm = () => {
  return (
    <form action="#" className="grid grid-cols-1 gap-[1px]">
      <div className="grid grid-cols-1 ss:grid-cols-2 gap-[1px]">
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none rounded-t ss:rounded-tl"
            value=""
            onChange=""
            placeholder="Full Name"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="hidden">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ss:rounded-tr"
            value=""
            onChange=""
            placeholder="Gender"
            required
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            min={1}
            max={120}
            id="age"
            name="age"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
            value=""
            onChange=""
            placeholder="Age"
            required
          />
        </div>
        <div>
          <input
            type="number"
            min={9111111111}
            id="phone"
            name="phone"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
            value=""
            onChange=""
            placeholder="Phone"
            required
          />
        </div>
        <div>
          <label htmlFor="doctor" className="hidden">
            Doctor
          </label>
          <select
            id="doctor"
            name="doctor"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
            value=""
            onChange=""
            placeholder="Doctor"
            required
          >
            <option value="" disabled>
              Doctor
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="department" className="hidden">
            Department
          </label>
          <select
            id="department"
            name="department"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
            value=""
            onChange=""
            placeholder="Department"
            required
          >
            <option value="" disabled>
              Department
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="hidden">
            Date
          </label>
          <select
            id="date"
            name="date"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
            value=""
            onChange=""
            placeholder="Date"
            required
          >
            <option value="" disabled>
              Date
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="time" className="hidden">
            Time
          </label>
          <select
            id="time"
            name="time"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
            value=""
            onChange=""
            placeholder="Time"
            required
          >
            <option value="" disabled>
              Time
            </option>
          </select>
        </div>
      </div>
      <textarea
        rows={5}
        id="message"
        name="message"
        className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
        value=""
        onChange=""
        placeholder="Message"
        required
      />
      <button className="text-primary-blue-dark font-medium tracking-wide bg-primary-blue-light rounded-b py-3 uppercase">
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;

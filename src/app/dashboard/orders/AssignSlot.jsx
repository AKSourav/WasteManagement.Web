import React, { useState } from 'react';

const DateTimePicker = ({item,index, action, close}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <div className="flex dark:text-black flex-col space-y-4">
      <div>
        <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">Select date:</label>
        <input
          type="date"
          id="date-picker"
          name="date-picker"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="time-picker" className="block text-sm font-medium text-gray-700">Select time:</label>
        <input
          type="time"
          id="time-picker"
          name="time-picker"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
           <button onClick={() => { action({item,index,formValue:{date:date,slot_time:time}}); close(); }} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
             Confirm
           </button>
           <button onClick={close} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
             Close
           </button>
      </div>
    </div>
  );
};

export default DateTimePicker;

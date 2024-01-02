import React from 'react';
import _ from 'lodash';

const GridView = ({ data, onSelect, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      {data.map((item, index) => (
        <div key={index} className="p-3 border border-gray-300 rounded mb-4 w-full max-w-lg">
          <div onClick={() => onSelect({ item, index })} className="cursor-pointer">
            {Object.keys(item).map((key, idx) => (
              <div key={idx} className="mb-2">
                <h3 className="text-lg font-semibold">{_.startCase(key)}</h3>
                <p className="text-gray-700">{item[key]}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            {onEdit && (
              <button
                onClick={() => onEdit({ item, index })}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete({ item, index })}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;

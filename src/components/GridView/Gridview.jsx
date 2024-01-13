import React from 'react';
import _ from 'lodash';

const GridView = ({ data, onSelect, onEdit, onDelete, className, renderButton }) => {
  return (
    <div className={"flex flex-col items-center justify-start w-full "+className}>
      {data?.map((item, index) => (
        <div key={index} className="p-7 border border-gray-300 bg-slate-200 transition-all hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-950 rounded m-2 mt-0 w-full">
          <div onClick={() => onSelect?onSelect({ item, index }):null} className="cursor-pointer flex flex-wrap  justify-between w-full">
            {Object.keys(item).map((key, idx) => (
              <div key={idx} className="mb-2">
                <h3 className="text-lg font-semibold">{_.startCase(key)}</h3>
                <p className="text-gray-700 dark:text-slate-100">{item[key]}</p>
              </div>
            ))}
            {renderButton && <>
              <button 
                onClick={renderButton.action}
                className="relative overflow-hidden bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold py-2 px-3 rounded-lg shadow-lg">
                {renderButton.title}
              </button>
            </>}
          </div>
          <div className="flex justify-end pr-8">
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

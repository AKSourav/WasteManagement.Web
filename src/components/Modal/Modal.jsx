import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none dark:text-slate-300">
          <div className="relative w-full h-full">
            {/* Modal content */}
            <div className="w-full h-full relative flex flex-col bg-white dark:bg-slate-950 border-2 border-gray-300 rounded-md shadow-md">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-gray-300 dark:bg-slate-950 bg-gray-100 rounded-t-md">
                <h3 className="text-lg font-semibold">{title || "Modal Title"}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 hover:dark:text-slate-300 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                </button>
              </div>
              {/* Modal body */}
              <div className="relative p-0 h-full overflow-auto " >{children}</div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      )}
    </>
  );
};

export default Modal;
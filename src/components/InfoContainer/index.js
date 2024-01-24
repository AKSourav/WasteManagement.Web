import React, { useEffect, useState,useMemo } from 'react';
import _ from 'lodash';
import tippy from 'tippy.js'; // Import tippy library
import 'tippy.js/dist/tippy.css'; // Import tippy styles


function RenderPrompt({ item, prompt, action, handleClosePrompt }) {
  return (
    <div style={{zIndex:9999999}} className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {prompt}
            </h3>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={() => { action({item}); handleClosePrompt(); }} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Confirm
            </button>
            <button onClick={handleClosePrompt} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 }
 
 function RenderCustomPrompt({ prompt,item, Element, action, handleClosePrompt }) {
   return (
     <div style={{zIndex:9999999}} className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             <h4 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
               {prompt}
             </h4>
             <div className='h-full w-full'>
               <Element item={item}  action={action} close={handleClosePrompt}/> 
             </div>
           </div>
         </div>
       </div>
     </div>
   );
  }

const truncateText = (text, maxLength) => {
  return text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const InfoContainer = ({ data,renderExtraButtons }) => {
  const [promptIndex,setPromptIndex] = useState();
  const item= useMemo(()=>data,[data]);

  const handleOpenPrompt= async ({title,item})=>{
    setPromptIndex({title,item});
  }
  const handleClosePrompt= async ()=>{
    setPromptIndex();
  }
  useEffect(() => {
    // Initialize tooltips after component is mounted
    tippy('.tooltip', {
      content: (reference) => reference.getAttribute('title'), // Use title attribute as content
      placement: 'top',
      arrow: true,
      duration: 200,
    });
  }, []);

  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-md sm:shadow-lg">
      <h2 className="text-xl font-bold mb-4">Information Container</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-4">
            <p className="text-sm font-semibold mb-1">{_.startCase(key).toUpperCase()}</p>
            <p
              className="text-base overflow-hidden tooltip"
              title={value}
              style={{ whiteSpace: 'nowrap' }}
            >
              {truncateText(value, 15) || "NULL"}
            </p>
          </div>
        ))}
      </div>
      {renderExtraButtons && (
        <div className='flex flex-row p-2 justify-end items-center'>
          {renderExtraButtons({item})?.map((buttonObj,buttonIndex)=>{
            return <>
              {promptIndex?.item===item && promptIndex?.title===buttonObj?.title && (buttonObj?.Element?<RenderCustomPrompt item={item} Element={buttonObj?.Element} prompt={buttonObj?.prompt} action={buttonObj?.action} handleClosePrompt={handleClosePrompt}/>:<RenderPrompt item={item} prompt={buttonObj.prompt} action={buttonObj.action} handleClosePrompt={handleClosePrompt}/>)}
              {buttonObj?.visibility && <button 
                key={buttonIndex}
                onClick={()=>buttonObj?.prompt?handleOpenPrompt({title:buttonObj.title,item}):buttonObj?.action()}
                className={buttonObj?.className || "relative overflow-hidden bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold py-2 px-3 rounded-lg shadow-lg"}>
                {buttonObj?.title}
              </button>}
            </>
          })}
        </div>
      )}
    </div>
  );
};

export default InfoContainer;

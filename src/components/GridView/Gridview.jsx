import React, { useState } from 'react';
import _ from 'lodash';

function RenderPrompt({ item,index, prompt, action, handleClosePrompt }) {
 return (
   <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
           <button onClick={() => { action({item,index}); handleClosePrompt(); }} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
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


const GridView = ({ data, onSelect, onEdit, onDelete, className, renderButton,renderExtraButtons,selected }) => {

  const [promptIndex,setPromptIndex] = useState();

  const handleOpenPrompt= async ({index})=>{
    setPromptIndex(index);
  }
  const handleClosePrompt= async ()=>{
    setPromptIndex();
  }

  return (
    <div className={"flex flex-col items-center justify-start w-full "+className}>
      {data?.map((item, index) => (
        <div key={index} className={`p-7 border border-gray-700 shadow-md shadow-slate-500  transition-all rounded m-2 mt-0 w-full ${selected===index?"dark:bg-black dark:hover:bg-black dark:shadow-inner dark:shadow-slate-200 bg-green-400 hover:bg-green-600":"bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-900 dark:shadow-inner dark:shadow-slate-200"}`}>
          <div onClick={() => onSelect?onSelect({ item, index }):null} className="cursor-pointer flex flex-wrap  justify-between w-full">
            {Object.keys(item).map((key, idx) => (
              <div key={idx} className="m-1 ml-3 mr-3">
                <h3 className="text-gray-800 dark:text-slate-100 text-lg font-bold">{_.startCase(key).toUpperCase()}</h3>
                <p className="text-sm text-gray-800 dark:text-slate-100 max-w-xs overflow-x-hidden">{String(item[key]).length>15?String(item[key]).slice(0,15)+"...":item[key] || "NA"}</p>
              </div>
            ))}
            {renderButton && <>
              <button 
                onClick={renderButton.action}
                className="relative overflow-hidden bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold py-2 px-3 rounded-lg shadow-lg">
                {renderButton.title}
              </button>
            </>}
            {renderExtraButtons && (
              <div className='flex flex-col p-2 justify-center items-center'>
                {renderExtraButtons({item,index})?.map((buttonObj,buttonIndex)=>{
                  return <>
                    {promptIndex===index && <RenderPrompt item={item} index={index} prompt={buttonObj.prompt} action={buttonObj.action} handleClosePrompt={handleClosePrompt}/>}
                    {buttonObj.visibility && <button 
                      key={buttonIndex}
                      onClick={()=>buttonObj.prompt?handleOpenPrompt({index}):buttonObj.action}
                      className={buttonObj.className || "relative overflow-hidden bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold py-2 px-3 rounded-lg shadow-lg"}>
                      {buttonObj.title}
                    </button>}
                  </>
                })}
              </div>
            )
            }
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

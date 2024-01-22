import React, { useState } from "react";

const Tab = ({ children, isSelected, onClick }) => (
 <button
   className={`py-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 ${
     isSelected ? 'font-extrabold border-indigo-500 text-indigo-800 dark:text-slate-100' : 'border-transparent hover:border-gray-200 hover:text-gray-600'
   }`}
   onClick={onClick}
 >
   {children}
 </button>
);

const Tabs = ({ children }) => {
    if (!children) {
      return children;
    }
    else if(!Array.isArray(children))
    {
        children=[children];
    }
 const [activeTab, setActiveTab] = useState(children[0]?.props?.label);
    // console.log("Children:",typeof(children))

 return (
   <div className="w-full">
     <div className="flex divide-x divide-gray-200 shadow-slate-300 shadow-lg">
       {children.map((child) => (
         <Tab
           key={child?.props?.label}
           isSelected={activeTab === child?.props?.label}
           onClick={() => setActiveTab(child?.props?.label)}
         >
           {child?.props?.label.toUpperCase()}
         </Tab>
       ))}
     </div>
     <div  style={{width:"full",padding:"1px",margin:"0px"}} className="border-b border-gray-200 h-full">
       {children.map((child) => {
         if (child?.props?.label !== activeTab) return undefined;
         return child?.props?.children;
       })}
     </div>
   </div>
 );
};

export default Tabs;

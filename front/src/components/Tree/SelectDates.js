import React, { useEffect } from 'react';
import './tree.css'
const SelectDates = ({dat,index}) => {
  
  useEffect(()=>{
    function iconshow(index){
      var a = document.getElementById('arrow-icn');
      console.log(index)
      if(index === 0){
        a.style.display = "none";
      }
      else{
        a.style.display = "block";
      }
    }
    iconshow(index);

  },[index])
  return (
    <div className='display-tree-wrapper'>
        <div className="arrow-icon" id = "arrow-icn">
          <svg class="w-4 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v12m0 0 4-4m-4 4L1 9" />
          </svg>
        </div>

        <div className="tree-component">
          <p>{dat.title}</p>
        </div>
      </div>
  );
};

export default SelectDates;

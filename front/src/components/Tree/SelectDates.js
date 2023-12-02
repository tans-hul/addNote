import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectDates = () => {
  const [startOptions, setStartOptions] = useState([]);
  const [endOptions, setEndOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalArray, setGlobalArray] = useState([]);
  // const [selectedStartOption, setSelectedStartOption] = useState('');
  // const [selectedEndOption, setSelectedEndOption] = useState('');
  const [selectedOptions ,setSelectedOptions ] = useState({
    start:'',
    end:''
  })
  useEffect(() => {
    async function getAllData() {
      const token = localStorage.getItem('token Store');
      try {
        const user_notes = await axios.get('http://localhost:5000/route/note2/getall', {
          headers: { Authorization: token },
        });

        setGlobalArray(user_notes.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getAllData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setStartOptions(generateOptions(0, globalArray.length));
      setEndOptions(generateOptions(0, globalArray.length));
    }
  }, [loading, globalArray]);

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i < end; i++) {
      options.push(
        <option key={globalArray[i]._id} value={globalArray[i]._id}>
          {globalArray[i].title}
        </option>
      );
    }
    return options;
  };

  const handleChange = (event) => {
    const {name,value} = event.target;
    setSelectedOptions({...selectedOptions,[name]:value});
    console.log(selectedOptions)

    // console.log(selectedOptions)
    // You can perform any necessary action here based on the selected start option
  };
  const onButton = async(selectedOptions = selectedOptions)=>{
        try {
          console.log(selectedOptions)
        
          const dataRequested = await axios.get(`http://localhost:5000/route/tree/data/${selectedOptions.start}/${selectedOptions.end}`)
          console.log(dataRequested)
        } catch (error) {
          console.log(error)
        }
  }
  // const handleEndChange = (event) => {
  //   event.preventDefault()
  //   setSelectedEndOption(event.target.value);
  //   console.log(selectedStartOption)
  //   console.log(selectedEndOption)

  //   // You can perform any necessary action here based on the selected end option
  // };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <label htmlFor="startDropdown">Start:</label>
      <select id="startDropdown" name='start' value={selectedOptions.start} onChange={handleChange}>
        {startOptions}
      </select>

      <label htmlFor="endDropdown">End:</label>
      <select id="endDropdown" name='end' value={selectedOptions.end} onChange={handleChange}>
        {endOptions}
      </select>
      <button type='button' onClick={()=>onButton(selectedOptions)}> Button </button>
    </div>
  );
};

export default SelectDates;

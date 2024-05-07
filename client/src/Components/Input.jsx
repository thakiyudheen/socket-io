import React, { useState } from 'react';

const Input = ({ count, setCount,sendMessage }) => {
const {message,setMessage}=useState([])
  return (
    <div className='flex flex-row justify-center'>
      <input
        onChange={(e) => setCount(e.target.value)}
        value={count}
        className=' mt-10 border border-gray-300 rounded-md px-4 py-2'
        type="text"
      />
      <button onClick={sendMessage} className='bg-blue-500 text-center mt-10 p-2 ml-2 rounded-md font-10 text-white h-[50px] text-sm'>Click here</button>
    </div>
  );
};

export default Input;

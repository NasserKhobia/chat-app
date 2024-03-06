import React from 'react'
import GenerateCheckbox from './GenerateCheckbox';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignUp from '../../../hooks/useSignUp';

const SignUp = () => {
  const [input,setInput] = useState({
    fullname:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  });

  const {loading,SignUp} = useSignUp();

  const handelCheckboxChange = (gender)=>{
    setInput({...input,gender})
  }

  const handelSubmit = async(e)=>{
    e.preventDefault();
    await SignUp(input);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>CahtApp</span> 
        </h1>
        <form onSubmit={handelSubmit}>
          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text'>FullName</span>
            </label>
            <input value={input.fullname} onChange={(e)=>setInput({ ...input,fullname:e.target.value })} type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10'/>
          </div>
          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input value={input.username} onChange={(e)=>setInput({ ...input,username:e.target.value })} type='text' placeholder='Enter username' className='w-full input input-bordered h-10'/>
          </div>
          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input value={input.password} onChange={(e)=>setInput({ ...input,password:e.target.value })} type='password' placeholder='Enter password' className='w-full input input-bordered h-10'/>
          </div>
          <div>
            <label htmlFor="" className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input value={input.confirmPassword} onChange={(e)=>setInput({ ...input,confirmPassword:e.target.value })} type='password' placeholder='confrim password' className='w-full input input-bordered h-10'/>
          </div>

          <GenerateCheckbox onCheckboxChange={handelCheckboxChange} selectedGender={input.gender}/>

          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>
          <div>
          <button
            disabled={loading}
            className='btn btn-block btn-sm mt-2'>
              {loading ? <span className='loading loading-spinner'></span>:"SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;







// start code
// import React from 'react'
// import GenerateCheckbox from './GenerateCheckbox';

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           Sign Up <span className='text-blue-500'>CahtApp</span> 
//         </h1>

//         <form>
//           <div>
//             <label htmlFor="" className='label p-2'>
//               <span className='text-base label-text'>FullName</span>
//             </label>
//             <input type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10'/>
//           </div>
//           <div>
//             <label htmlFor="" className='label p-2'>
//               <span className='text-base label-text'>UserName</span>
//             </label>
//             <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'/>
//           </div>
//           <div>
//             <label htmlFor="" className='label p-2'>
//               <span className='text-base label-text'>Password</span>
//             </label>
//             <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10'/>
//           </div>
//           <div>
//             <label htmlFor="" className='label p-2'>
//               <span className='text-base label-text'>Confirm Password</span>
//             </label>
//             <input type='password' placeholder='confrim password' className='w-full input input-bordered h-10'/>
//           </div>

//           <GenerateCheckbox/>

//           <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//             Already have an account?
//           </a>
//           <div>
//           <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignUp;

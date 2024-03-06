import React from 'react'

const GenerateCheckbox = ({onCheckboxChange,selectedGender}) => {
    return (
    <div className='flex'>
        <div className='form-control'>
            <label htmlFor="" className={`label gap-3 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}>
                <span className='label-text'>Male</span>
                <input type='checkbox' checked={selectedGender === 'male'} onChange={()=>onCheckboxChange('male')} className='checkbox border-slate-900'/>
            </label>
        </div>
        <div className='form-control'>
            <label htmlFor="" className={`label gap-3 cursor-pointer ${selectedGender === 'female' ? 'selected' : ''}`}>
                <span className='label-text'>Female</span>
                <input type='checkbox' checked={selectedGender === 'female'} onChange={()=>onCheckboxChange('female')} className='checkbox border-slate-900'/>
            </label>
        </div>
        
    </div>
    )
}

export default GenerateCheckbox;


// starter code
// import React from 'react'

// const GenerateCheckbox = () => {
//     return (
//     <div className='flex'>
//         <div className='form-control'>
//             <label htmlFor="" className='label gap-3 cursor-pointer'>
//                 <span className='label-text'>Male</span>
//                 <input type='checkbox' className='checkbox border-slate-900'/>
//             </label>
//         </div>
//         <div className='form-control'>
//             <label htmlFor="" className='label gap-3 cursor-pointer'>
//                 <span className='label-text'>Female</span>
//                 <input type='checkbox' className='checkbox border-slate-900'/>
//             </label>
//         </div>
        
//     </div>
//     )
// }

// export default GenerateCheckbox;

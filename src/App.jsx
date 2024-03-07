import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [isNumberAllowed,setIsNumberAllowed] = useState(true)
  const [isCharacterAllowed , setIsCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  //Here basically,particularly in this project useCallBack is not needed,because the dependencies are going to change on every instance,
  //This is implemented to just understand the concept of useCallback, that is returns the same function instance when the parameter doesn't 
  //changed or we can also say that the value of the dependencies doesn't changed
  const generatePassword = useCallback(()=>{
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopsdfghjklzxcvbnm" ; 
    if(isNumberAllowed) str+="12345678901234567890"
    if(isCharacterAllowed) str+="!@#$%^&*()_+@#$%^&*()_+"
    let pass = "";
    for(let i=1;i<=length; i++ ){
      pass+=str.charAt(Math.floor(Math.random()*str.length+1))
    }
    setPassword(pass) 
  },[length,isCharacterAllowed,isNumberAllowed])

  //If the value of the dependencies are changed the useEffect knows that and calls the generatePassword method
  useEffect(()=>{
    generatePassword()
  },[length,isCharacterAllowed,isNumberAllowed])

  const CopyThePassword = ()=>{
    window.navigator.clipboard.writeText(password) ; 
    passwordRef.current.select() ;
  }

  return (
      <div className='w-full max-w-xl rounded-xl mx-auto shadow-md px-9 py-3 my-8 mt-56 text-pink-950 text-xl ' >
        <h1 className='text-white text-center my-3 font-bold'> PASSWORD GENERATOR</h1>
        <div className='flex justify-center'>
          <input 
          type="text"
          className='text-center outline-none bg-slate-400 py-1 px-3'
          value={password}
          ref={passwordRef}
          readOnly
          />
          <button 
          className='border rounder-md px-3 border-purple-800 bg-red-600 text-white'
          onClick={CopyThePassword}
          >copy</button>
        </div>
        <div className='my-5 flex justify-center mt-6'>
          <input 
            type="range" 
            min={8}
            max={30}
            className='cursor-pointer ' 
            onChange={(e)=>{setLength(e.target.value)}} 
            value={length}
            id="lenSlider"
            />
            <label htmlFor='lenSlider' className='mx-4'>length : {length}</label>
            
        </div>
        <div className='grid sm:grid-cols-2 justify-center gap-2'>
        <div>
        <input 
            type="checkbox" 
            checked = {isNumberAllowed}
            id='NA'
            className='NA mx-1'
            onChange={()=>{setIsNumberAllowed((prev)=>!prev)}}
            />
        <label htmlFor="NA">toggle Number Allowed</label>
        </div>
        <div >
        <input 
            type="checkbox" 
            checked = {isCharacterAllowed}
            id='CA'
            className='CA mx-1'
            onChange={()=>{setIsCharacterAllowed((prev)=>!prev)}}
            />
        <label htmlFor="CA">toggle Character Allowed</label>
        </div>
        </div>
      </div>
  )
}

export default App

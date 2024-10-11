import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function Askquestion() {
  const [serverResponse,setServerResponse] = useState('');
  const [error, setError] = useState(false);
  const {register,handleSubmit,reset,formState:{errors}} = useForm();
  const [isSubmitting,setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token'); 
  console.log(token)
 

  // POSTQUESTION FUNCTION
  const postQuestion = async (data)=>{
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:5500/questions/ask',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
      });

      const result = await response.json()
      if(!response.ok){
        setError(true)
        setServerResponse(result.msg)
        return
      }
      setServerResponse(result.msg)
    } catch (error) {
      setError(true)
      setServerResponse("Something went wrong. please try again later")
      console.log(error)
    } finally{
      setIsSubmitting(false)
      setError(false)
      reset()
    }
  }
  useEffect(()=>{
    if(serverResponse){
      setTimeout(()=>{
        setServerResponse('')
        if(!error){
          navigate('/questions')
        }
      },2000)
    }
  },[serverResponse,error,navigate])
  return (
    <div>
      <div className=' mb-32'>
          <Nav />
          <div className='mt-8 mx-8 md:px-12 lg:mx-[20%]'>
            <h1 className='text-xl text-blue-600 font-semibold underline underline-offset-[8px] mb-4 '>Steps to Write A Good Question.</h1>
            <ul className='list-disc mb-8'>
                <li>Summarize your problems in a oneo line title</li>
                <li>Describe your problem in more detail.</li>
                <li>Describe what you tried and what you expected to happen</li>
                <li>Review your question and post it here</li>
            </ul>
            <form  onSubmit={handleSubmit(postQuestion)}>
                <h2 className='text-center mb-4 font-semibold text-orange-600 text-xl'>Post Your Question</h2>
                <p className={`transition-opacity text-center duration-200 ease-in-out ${error?`text-red-600`:`text-green-600` } ${serverResponse?`opacity-100 -translate-y-2`:`opacity-0` }`}>{serverResponse}</p>

                <input className='border-2  px-4 py-2 w-full' 
                      placeholder='Title of your question.'
                      {...register("title",{
                        required:"Title is required.",
                        minLength:{
                          value:20,
                          message:"Title must be atleast 20 characters long."
                        },
                        maxLength:{
                          value:100,
                          message:"Title must be atmost 100 characters long."
                        }
                      })}
                ></input>
                {errors.title && <p className="text-red-600 text-center">{errors.title.message}</p>}
                <textarea   placeholder='Description of your question'
                      className='w-full h-28  border-2 outline-blue-500 resize-none p-4 mt-8'
                      {...register("description",{
                        required:"Description is required.",
                        minLength:{
                          value:20,
                          message:"Description must be atleast 20 characters long."
                        },
                        maxLength:{
                          value:300,
                          message:"Description must be atmost 300 characters long."
                        }
                      })}
                      ></textarea>
                    {errors.description && <p className="text-red-600 text-center">{errors.description.message}</p>}
                      <input className='border-2  px-4 py-2 w-full' 
                            placeholder='Tag of your question.'
                            {...register("tag",{
                              required:"Title is required.",
                              maxLength:{
                                value:100,
                                message:"Description must be atmost 100 characters long."
                              }
                            })}
                      ></input>
                    {errors.tag && <p className="text-red-600 text-center">{errors.tag.message}</p>}
                     
                      <button type='submit' className={`${isSubmitting?`bg-blue-600`:`bg-blue-800`}  py-2 px-8 mt-8 rounded-md text-white `}>
                          {isSubmitting?`Submitting`:`Post Question`}
                      </button>           
            </form>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Askquestion

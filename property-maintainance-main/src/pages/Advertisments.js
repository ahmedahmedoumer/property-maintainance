import React, { Fragment, useCallback, useEffect, useState, useRef } from 'react'
import {  Textarea, Input, Button } from "@material-tailwind/react";
import Toast from '../components/UI/Toast';
import Spinner from '../components/UI/Spinner';
import { CloudArrowUpFill, PlusCircleDotted, Trash } from 'react-bootstrap-icons';
import { addAdvertisment, getAllAdvertisments, changeAdvertismentStatus, uploadImage, deleteAdvertisment } from '../APIs/advertismentAPIs';
import useInput from '../hooks/use-input';
import { v4 as uuid } from "uuid";
import { Confirm } from '../components/UI/Confirm';

const AdvertismentsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [advertisments, setAdvertisments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const [advertismentId, setAdvertismentId] = useState(null);
  const fileInput = useRef();
  const {
    value: title,
    isValid: titleIsValid,
    isInvalid: titleIsInValid,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle
  } = useInput(value => value.trim() !== '');

  const {
    value: imagePath,
    isValid: imagePathIsValid,
    isInvalid: imagePathIsInValid,
    inputChangeHandler: imagePathChangeHandler,
    inputBlurHandler: imagePathBlurHandler,
    reset: resetImagePath
  } = useInput(value => value.trim() !== '');

  const {
    value: description,
    isValid: descriptionIsValid,
    isInvalid: descriptionIsInValid,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription
  } = useInput(value => value.trim() !== '');

  const formIsValid = titleIsValid && imagePathIsValid && descriptionIsValid;

  const addServiceSubmitHandler = async (e) => {
    e.preventDefault();
    if(title === '' || imagePath === '' || description === ''){
      setError("Please enter all details")
      return;
    }
    const advertismentData = {
      title,
      imagePath,
      description,
      date: new Date().toString(),
      status: "active",
    }
    setIsSubmitting(true);
    const newID = await addAdvertisment(advertismentData, { setError, setSuccess, setIsSubmitting });
    setAdvertisments(advertisments => [
      {
        _id: newID,
        ...advertismentData
      },
      ...advertisments])
    resetTitle();
    resetImagePath();
    resetDescription();
  }
  const uploadImageHandler = async (event) => {
    if (event.target.files[0]){
      setIsUploading(true);
      const imagePath = await uploadImage(event.target.files[0], {setError, setIsUploading})
      imagePathChangeHandler(imagePath);
    }
  }
  const changeAdvertismentStatusHandler = async (advertismentId, status, index) => {
    const newStatus = status === "active" ? "not-active" : "active"
    await changeAdvertismentStatus(newStatus , advertismentId ,{ setError, setSuccess });
    const updatedAdvertisments = advertisments.map((advertisment, i) => {
      if(index === i){
        return { ...advertisment, status: newStatus}
      }else{
        return advertisment;
      }
    })
    setAdvertisments(updatedAdvertisments);
  }
  const deleteAdvertismentHandler = async () => {
    await deleteAdvertisment(advertismentId ,{ setError, setSuccess });
    setIsConfirmDeleteShown(false);
    setAdvertisments(advertisments.filter(advertisment => advertisment._id !== advertismentId));
  }
  const deleteImageHandler = async () => {
    imagePathChangeHandler('');
  }
  const fetchData = useCallback(async () => {
    const advertisments = await getAllAdvertisments({ setError, setIsLoading });
    setAdvertisments(advertisments);
  }, []);
  const deleteClickHandler = (advertismentId) => {
    setIsConfirmDeleteShown(true);
    setAdvertismentId(advertismentId);
    console.log(advertismentId);
  }
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className='w-3/4'>
      {isConfirmDeleteShown && <Confirm confirmButtonText="Delete" confirmTitle="Delete" onClick={deleteAdvertismentHandler} onCancel={() => {setIsConfirmDeleteShown(false)}}>Are you sure you want to delete this post?</Confirm>}
      <form onSubmit={addServiceSubmitHandler} className='space-y-8 flex flex-col mt-10'>
        <Input type="text" error={titleIsInValid} onBlur={titleBlurHandler} label="Title" value={title} onChange={titleChangeHandler}/>
        <Textarea label="Description" error={descriptionIsInValid} onBlur={descriptionBlurHandler} value={description} onChange={descriptionChangeHandler}/>
        {/* <Button type='button' label="Image" error={imagePathIsInValid} onBlur={imagePathBlurHandler} value={imagePath} onChange={imagePathChangeHandler} icon={<CloudArrowUpFill/>}>Upload image</Button> */}
        <div className='group relative w-full h-[200px] border border-dashed border-gray-400 hover:border-gray-600 flex justify-center items-center'>
          {imagePath ?
            <Fragment>
              <img src={imagePath} alt='' className='w-full h-full object-contain'/>
              <button onClick={deleteImageHandler} type='button' className='hidden group-hover:flex animate-pulse bg-white/60 items-center justify-center w-20 h-20 p-3 absolute rounded-full text-gray-600 hover:bg-white/70 hover:text-rose-500'><Trash className='w-10 h-10'/></button>
            </Fragment>
            :
            <Fragment>
              <input ref={fileInput} onChange={uploadImageHandler} type="file" className='hidden'/>
              {isUploading ? <Spinner type="main"/> : <button onClick={()=>{fileInput.current.click()}} className='text-gray-500 w-full h-full hover:bg-gray-100 flex justify-center items-center' type='button'><PlusCircleDotted className='w-10 h-10'/></button>}
            </Fragment>
          }
        </div>
        <Button type='submit' className='self-center w-3/12 text-sm py-3 disabled:cursor-not-allowed' disabled={isSubmitting || !formIsValid} color="blue">{isSubmitting ? <Spinner/> : "Post"}</Button>
      </form>
      <div className='my-10'>
        {error && <h2 className='font-semibold my-5 text-xl'>Recents</h2>}
        {isLoading && <Spinner type="main"/>}
        {error && <p>{error}</p>}
        {
          (advertisments && !isLoading && !error) && advertisments.map((advertisment, index) => (
            <ul key={advertisment._id} className='flex flex-col border-b space-y-3 py-3'>
              {(advertisment.imagePath !== '') && <img src={advertisment.imagePath} alt='' className='w-[200px] h-[200px] object-contain'/>}
              <li><span className='font-semibold'>Title:</span> {advertisment.title}</li>
              <li><span className='font-semibold'>Description:</span> {advertisment.description}</li>
              <li><span className='font-semibold'>Date:</span> {advertisment.date}</li>
              <li className='flex justify-between items-center pt-5'>
                <span>
                  <span className='font-semibold'>Status:</span>
                  {(advertisment.status === "not-active") && <span className='ml-2 text-rose-500'>Not active</span>}
                  {(advertisment.status === "active") && <span className='ml-2 text-emerald-500'>Active</span>}
                </span>
                <span className='flex items-center'>
                  {<Button onClick={() => deleteClickHandler(advertisment._id)} className='mr-3 bg-transparent border border-rose-500 text-rose-500 flex items-center' color='white'><Trash className='mr-2'/> Delete</Button>}
                  {(advertisment.status === "not-active") && <Button onClick={() => changeAdvertismentStatusHandler(advertisment._id, advertisment.status, index)} className='bg-emerald-200 text-emerald-600 shadow-[0_4px_9px_-4px_emerald]' color='green'>Activate</Button>}
                  {(advertisment.status === "active") && <Button onClick={() => changeAdvertismentStatusHandler(advertisment._id, advertisment.status, index)} className='bg-rose-200 text-rose-600 shadow-[0_4px_9px_-4px_rose]' color='red'>Deactivate</Button>}
                </span>
              </li>
            </ul>
          ))
        }
      </div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
      {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
    </div>
  )
}

export default AdvertismentsPage;
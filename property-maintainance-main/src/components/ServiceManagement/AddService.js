import React, { Fragment, useState } from 'react'
import { Select, Option, Textarea, Input, Button } from "@material-tailwind/react";
import Toast from '../UI/Toast';
import Spinner from '../UI/Spinner';
import { addService } from '../../APIs/serviceAPIs';
import useInput from '../../hooks/use-input';

const AddService = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // const [serviceCategory, setServiceCategory] = useState("");
  // const [servicePrice, setPrice] = useState(0);
  // const [serviceType, setProviderType] = useState("");
  // const [serviceMaterials, setMaterialsRequired] = useState("");
  const {
    value: serviceCategory,
    isValid: serviceCategoryIsValid,
    isInvalid: serviceCategoryIsInValid,
    inputChangeHandler: serviceCategoryChangeHandler,
  } = useInput(value => value.trim() !== '');

  const {
    value: serviceType,
    isValid: serviceTypeIsValid,
    isInvalid: serviceTypeIsInValid,
    inputChangeHandler: serviceTypeChangeHandler,
  } = useInput(value => value.trim() !== '');

  const {
    value: serviceMaterials,
    isValid: serviceMaterialsIsValid,
    isInvalid: serviceMaterialsIsInValid,
    inputChangeHandler: serviceMaterialsChangeHandler,
  } = useInput(value => value.trim() !== '');

  const {
      value: servicePrice,
      isValid: servicePriceIsValid,
      isInvalid: servicePriceIsInValid,
      inputChangeHandler: servicePriceChangeHandler,
  } = useInput(value => value.trim() !== '');

  const formIsValid = serviceCategoryIsValid && serviceTypeIsValid && serviceMaterialsIsValid && servicePriceIsValid;

  const changeHandler = (value) => {
    console.log(value);
  }
  const addServiceSubmitHandler = (e) => {
    e.preventDefault();
    if(serviceCategory === '' || servicePrice === '' || serviceType === '' || serviceMaterials === ''){
      setError("Please enter all details")
      return;
    }
    const serviceData = {
      serviceCategory,
      servicePrice,
      serviceType,
      serviceMaterials
    }
    // console.log(serviceData);
    setIsSubmitting(true);
    addService(serviceData, { setError, setSuccess, setIsSubmitting });
  }
  return (
    <Fragment>
      <form onSubmit={addServiceSubmitHandler} className='space-y-8 flex flex-col mt-10'>
        <Select label="Select service category" onChange={(value) => serviceCategoryChangeHandler(value)}>
          <Option value='Material Tailwind HTML'>Material Tailwind HTML</Option>
          <Option value='Material Tailwind React'>Material Tailwind React</Option>
          <Option value='Material Tailwind Vue'>Material Tailwind Vue</Option>
          <Option value='Material Tailwind Angular'>Material Tailwind Angular</Option>
          <Option value='Material Tailwind Svelte'>Material Tailwind Svelte</Option>
        </Select>
        <Input type="number" label="Price/hour" onChange={e => servicePriceChangeHandler(e.target.value)}/>
        <Select label="Select service provider type" onChange={(value) => serviceTypeChangeHandler(value)}>
          <Option value='Material Tailwind HTML'>Material Tailwind HTML</Option>
          <Option value='Material Tailwind React'>Material Tailwind React</Option>
          <Option value='Material Tailwind Vue'>Material Tailwind Vue</Option>
          <Option value='Material Tailwind Angular'>Material Tailwind Angular</Option>
          <Option value='Material Tailwind Svelte'>Material Tailwind Svelte</Option>
        </Select>
        <Textarea label="Materials required" onChange={e => serviceMaterialsChangeHandler(e.target.value)}/>
        <Button type='submit' className='self-center w-3/12 text-sm py-3 disabled:cursor-not-allowed' disabled={!formIsValid} color="blue">{isSubmitting ? <Spinner/> : "Submit"}</Button>
      </form>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
      {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
    </Fragment>
  )
}

export default AddService
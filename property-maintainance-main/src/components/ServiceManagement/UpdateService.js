import React, { Fragment, useEffect, useState } from 'react'
import Toast from '../UI/Toast';
import Spinner from '../UI/Spinner';
import { Select, Option, Textarea, Input, Button } from "@material-tailwind/react";
import { getServices, getService, updateService } from '../../APIs/serviceAPIs';
import useInput from '../../hooks/use-input';
const UpdateService = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [services, setServices] = useState({});
  const [serviceId, setServiceId] = useState(null);

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

  const updateServiceSubmitHandler = async (e) => {
    e.preventDefault();
    const serviceData = {
      serviceCategory,
      serviceMaterials,
      serviceType,
      servicePrice,
    }
    await updateService(serviceId, serviceData, { setError, setIsSubmitting, setSuccess });
  }
  const serviceClickHandler = async (e) => {
    async function fetchData(){
      const services = await getServices({setError, setIsLoading});
      console.log(services);
      setServices(services);
    }
    fetchData();
  }

  const chooseServiceChangeHandler = async (value) => {
    setServiceId(value.trim());
    const fetchedServiceData = await getService(value.trim(),{setError, setIsLoading});
    // // handler functions inside useInput hook
    serviceCategoryChangeHandler(fetchedServiceData.serviceCategory);
    servicePriceChangeHandler(fetchedServiceData.servicePrice.toString());
    serviceMaterialsChangeHandler(fetchedServiceData.serviceMaterials);
    serviceTypeChangeHandler(fetchedServiceData.serviceType);
  }
  return (
    <Fragment>
      <form onSubmit={updateServiceSubmitHandler} className='space-y-6 flex flex-col mt-10'>
        <Select className='border-b' onClick={serviceClickHandler} onChange={chooseServiceChangeHandler} label="Select service">
          {services.length ? services.map((service) => (
            <Option value={service._id} key={service._id}>{service.serviceCategory}</Option>
          )) : <p>No service found</p>}
        </Select>
        <div className='border-t pt-6'>
          <Select error={serviceCategoryIsInValid} label="Select service category" value={serviceCategory} onChange={serviceCategoryChangeHandler}>
            <Option value='Material Tailwind HTML'>Material Tailwind HTML</Option>
            <Option value='Material Tailwind React'>Material Tailwind React</Option>
            <Option value='Material Tailwind Vue'>Material Tailwind Vue</Option>
            <Option value='Material Tailwind Angular'>Material Tailwind Angular</Option>
            <Option value='Material Tailwind Svelte'>Material Tailwind Svelte</Option>
          </Select>
        </div>
        <Input error={servicePriceIsInValid} type="number" label="Price/hour" value={servicePrice} onChange={servicePriceChangeHandler}/>
        <Select error={serviceTypeIsInValid} label="Select service provider type" value={serviceType} onChange={serviceTypeChangeHandler}>
          <Option value='Material Tailwind HTML'>Material Tailwind HTML</Option>
          <Option value='Material Tailwind React'>Material Tailwind React</Option>
          <Option value='Material Tailwind Vue'>Material Tailwind Vue</Option>
          <Option value='Material Tailwind Angular'>Material Tailwind Angular</Option>
          <Option value='Material Tailwind Svelte'>Material Tailwind Svelte</Option>
        </Select>
        <Textarea error={serviceMaterialsIsInValid} label="Materials required" value={serviceMaterials} onChange={serviceMaterialsChangeHandler}/>
        <Button type='submit' className='self-center w-3/12 text-sm py-3 disabled:cursor-not-allowed' disabled={isSubmitting || !formIsValid} color="blue">{isSubmitting ? <Spinner/> : "Update"}</Button>
      </form>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
      {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
    </Fragment>
  )
}

export default UpdateService
import axios from 'axios'
const serverLink = 'http://localhost:5000';

export const updateService = async (serviceId, serviceData, { setError, setIsSubmitting, setSuccess }) => {
    try{
       
        const response = await fetch(`${serverLink}/service/${serviceId}`, {
            method: 'PATCH',
            body: JSON.stringify(serviceData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not update service.');
        }
        setIsSubmitting(false);
        setSuccess("Service updated successfully");
        setError(null);
        return true;
    } catch(error){
        setError("Sorry, something went wrong");
        setIsSubmitting(false);
        setSuccess(null);
        return false;
    }
}
export const getServices = async ({setError, setIsLoading}) => {
    setIsLoading(true);
    let loadedServices = [];
    try{
        const url = `${serverLink}/service`;
      axios.get(url)
        .then(res=>{
           const services = res.data.services;
           for(const key in services){
            loadedServices.push({
                ...services[key]
            });
            }
               setIsLoading(false);
               setError(null);
               console.log(res.data.service);
        })
        .catch(err=>{
            setIsLoading(false);
            setError("Couldn't fetch services");
            console.log(err)});
    }catch(error){
        setIsLoading(false);
        setError("Couldn't fetch services");
    }
    return loadedServices;

        // const data = await response.json();
        // if (!response.status===200) {
        //     throw new Error(data.message || 'Cannot get services.');
        // }
    //     const services = data["services"];
    //     for(const key in services){
    //         loadedServices.push({
    //             ...services[key]
    //         });
    //     }
    //     setIsLoading(false);
    //     setError(null);
    // catch(error){
    //     setIsLoading(false);
    //     setError("Couldn't fetch services");
    // }
    // return loadedServices;
}
export const getService = async (serviceId, {setError, setIsLoading}) => {
    setIsLoading(true);
    let loadedService = {};
    try{
        const url = `${serverLink}/service/${serviceId}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get service.');
        }
        loadedService = data["service"][0];
        setIsLoading(false);
        setError(null);
    } catch(error){
        console.log(error)
        setIsLoading(false);
        setError("Couldn't ddddfetch service");
    }
    return loadedService;
}

export const addService = (serviceData, {setError, setSuccess, setIsSubmitting}) => {
    axios.post(`${serverLink}/service/add`, serviceData)
    .then(res=>{ 
        if(res.status===201){
            console.log(res.status);
            setSuccess("Service added successfully");
            setError(null);
            setIsSubmitting(false);
        }
    })
    .catch(error=>{
        let errorMessage = error.data.message || 'Error adding service!';
        throw new Error(errorMessage);

    })
        // if(res.ok){
        //     setError(null);
        //     // console.log(res.json());
        //     return res.json();
        // }else{
        //     return res.json().then((data) => {
        //         console.log(data);
        //         let errorMessage = 'Error adding service!';
        //         if ((data && data.error) || data.error.message) {
        //             errorMessage = data.error.message || data.error;
        //         }
        //         throw new Error(errorMessage);
        //     });
        // }
    // })
    // .then((data) => { // if successful
    //     setSuccess("Service added successfully");
    //     setError(null);
    //     setIsSubmitting(false);
    // })
    .catch((err) => {
        setIsSubmitting(false);
        setSuccess(null);
        console.log(err.message);
        setError(err.message);
    });
}
export const deleteService = async (serviceId, { setError, setSuccess }) => {
    try{
        const response = await fetch(`${serverLink}/service/${serviceId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not delete service.');
        }
        setSuccess("Service deleted successfully");
        setError(null);
        return true;
    } catch(error){
        setSuccess(null);
        setError("Sorry, something went wrong");
        return false;
    }
}

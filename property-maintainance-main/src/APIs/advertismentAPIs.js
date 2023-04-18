
import axios from 'axios';
const serverLink = 'http://localhost:5000';

export const addAdvertisment = async (advertismentData, {setError, setSuccess, setIsSubmitting}) => {
    
    try{
        const response = await axios.post(`${serverLink}/advertisment/add`, advertismentData)
        .then(res=>{
            const data=res.data;
            setSuccess("Advertisment added successfully");
            setError(null);
            setIsSubmitting(false);
            return data.newId;
        })
        .catch(error=>{
            let errorMessage = error.data.message||'Error adding advertisment!';
            throw new Error(errorMessage);
        });
        // const data = await response.json();
        // if (!response.ok) {
        //     return response.json().then((data) => {
        //         let errorMessage = 'Error adding advertisment!';
        //         if (data && data.error || data.error.message) {
        //             errorMessage = data.error.message || data.error;
        //         }
        //         throw new Error(errorMessage);
        //     });
        // }
        // setSuccess("Advertisment added successfully");
        // setError(null);
        // setIsSubmitting(false);
        // return data.newId;
    } catch(err){
        setIsSubmitting(false);
        setSuccess(null);
        console.log(err.message);
        setError(err.message);
        return "";
    }
}

export const getAllAdvertisments = async ({setError, setIsLoading}) => {
    setIsLoading(true);
    let loadedAdvertisments = [];
    try{
        const url = `${serverLink}/advertisment`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get advertisments.');
        }
        const advertisments = data["advertisments"];
        for(const key in advertisments){
            loadedAdvertisments.push({
                ...advertisments[key]
            });
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError("Couldn't fetch advertisments");
    }
    return loadedAdvertisments;
}

export const changeAdvertismentStatus = async (status, advertismentId, { setError, setSuccess }) => {
    try{
        const response = await fetch(`${serverLink}/advertisment/${advertismentId}`, {
            method: 'PATCH',
            body: JSON.stringify({status}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not update advertisment.');
        }
        setSuccess("Advertisment updated successfully");
        setError(null);
        return true;
    } catch(error){
        setError("Sorry, something went wrong");
        setSuccess(null);
        return false;
    }
}
export const deleteAdvertisment = async (advertismentId, { setError, setSuccess }) => {
    try{
        const response = await fetch(`${serverLink}/advertisment/${advertismentId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not delete advertisment.');
        }
        setSuccess("Advertisment deleted successfully");
        setError(null);
        return true;
    } catch(error){
        setError("Sorry, something went wrong");
        setSuccess(null);
        return false;
    }
}

export const uploadImage = async (fileName, { setError, setIsUploading }) => {
    try{
        const formData = new FormData()
        formData.append('imagePath', fileName)
        const response = await fetch(`${serverLink}/advertisment/upload-image`, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Could not upload image.');
        }
        setIsUploading(null);
        setError(null);
        return data.imagePath;
    } catch(error){
        setError("Sorry, something went wrong");
        setIsUploading(null);
        return null;
    }
}
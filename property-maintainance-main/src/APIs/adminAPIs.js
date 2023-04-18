const serverLink = 'http://localhost:5000';

export const loginCall = async (userCredential, dispatch) => {
  
  console.log(dispatch);
  dispatch({ type: "LOGIN_START" });
  try {
      const response = await fetch(`${serverLink}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(userCredential),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const data = await response.json();
      if (!response.ok) {
          return response.json().then((data) => {
              let errorMessage = 'Error adding advertisment!';
              if (data && data.error || data.error.message) {
                  errorMessage = data.error.message || data.error;
              }
              throw new Error(errorMessage);
          });
      }
      console.log(data);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};


export const addAdmin = async (adminData) => {
    
  try{
      const response = await fetch(`${serverLink}/auth/register`, {
          method: 'POST',
          body: JSON.stringify(adminData),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
          return response.json().then((data) => {
              let errorMessage = 'Error registering admin!';
              if (data && data.error || data.error.message) {
                  errorMessage = data.error.message || data.error;
              }
              throw new Error(errorMessage);
          });
      }
  } catch(err){
      console.log(err.message);
  }
}
const serverLink = 'http://localhost:5000';

export const getUser = async (userId) => {
    let loadedUser = {};
    try{
        const url = `${serverLink}/users/${userId}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get user.');
        }
        loadedUser = data["user"][0];
        return loadedUser;
    } catch(error){
        console.log(error);
    }
    return loadedUser;
}

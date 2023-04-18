const serverLink = 'http://localhost:5000';

export const getConversations = async (userId) => {
    try{
        const response = await fetch(`${serverLink}/conversations/find/${userId}`, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            return response.json().then((data) => {
                let errorMessage = 'Error getting conversation!';
                if (data && data.error || data.error.message) {
                    errorMessage = data.error.message || data.error;
                }
                throw new Error(errorMessage);
            });
        }
        console.log(data.conversations);
        if(data.conversations.length){
          return data.conversations;
        }
        return [];
    } catch(err){
        console.log(err.message);
        return "";
    }
}
export const getMessages = async (conversationId) => {
    try {
        const response = await fetch(`http://localhost:5000/messages/${conversationId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get messages.');
        }
        console.log(data);
        return data
      } catch (err) {
        console.log(err);
      }
}
export const createConversation = async (userId1, userId2) => {
    try{
        const response = await fetch(`${serverLink}/conversations`, {
            method: 'POST',
            body: JSON.stringify({userId1: userId1, userId2: userId2}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return response.json().then((data) => {
                let errorMessage = 'Error creating conversation!';
                if (data && data.error || data.error.message) {
                    errorMessage = data.error.message || data.error;
                }
                throw new Error(errorMessage);
            });
        }
        console.log(data);
        return data;
    } catch(err){
        console.log(err.message);
        return "";
    }
}
export const sendMessage = async (message, messages, setMessages, setNewMessage) => {
    try{
        fetch(`http://localhost:5000/messages`, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => {
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data) => {
                console.log(data);
                let errorMessage = 'Error on sending message!';
                if (data && data.error || data.error.message) {
                    errorMessage = data.error.message || data.error;
                }
                throw new Error(errorMessage);
                });
            }
        }).then((data) => {
            console.log([...messages, data]);
            setMessages([...messages, data]);
            setNewMessage("");
            updateConversation(message.conversationId, message.text);
        }).catch(err => {
            console.log(err);
        })
    } catch(err){
        console.log(err.message);
        return "";
    }
}
export const updateConversation = async (conversationId, lastMessage) => {
    try{
        fetch(`http://localhost:5000/conversations/${conversationId}`, {
            method: 'PATCH',
            body: JSON.stringify({lastMessage}),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => {
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data) => {
                console.log(data);
                let errorMessage = 'Error on updating conversation!';
                if (data && data.error || data.error.message) {
                    errorMessage = data.error.message || data.error;
                }
                throw new Error(errorMessage);
                });
            }
        }).then((data) => {

        }).catch(err => {
            console.log(err);
        })
    } catch(err){
        console.log(err.message);
        return "";
    }
}

const { useEffect, useState } = require("react")



const AuthorizeUser = () => {
    const [isUser, setUser] = useState(false);
    

    useEffect(() => {
        const token = localStorage.getItem("student");
        if (token)
        {

            // fetch('http://localhost:8081/authorizeUser', {  
            fetch('https://rshs1-online-archive-system.onrender.com/authorizeUser', {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({token: token})
            })  
            .then(res => res.json())
            .then(data => {
                if (data.status === "Expired") {
                    Delete("student");
                }
                else if (data.status === "Student"){
                    setUser(true);
                }
            })
            .catch(err => console.log(err));
        }
    }, [])

    return isUser;
}


const AuthorizeAdmin = () => {
    const [isAdmin, setAdmin] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem("admin");

      if (token) {

        // fetch('http://localhost:8081/authorizeAdmin', {
        fetch('https://rshs1-online-archive-system.onrender.com/authorizeAdmin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: token})
            })  
            .then(res => res.json())
            .then(data => {
                if (data.status === "Expired") {
                    Delete("admin");
                }
                else if (data.status === "Admin"){
                    setAdmin(true);
                }
            })
            .catch(err => console.log(err));
        }
    }, [])
    
    return isAdmin
}

const Delete = (name) => {
    localStorage.removeItem(name);
    return;
}


export {AuthorizeUser, AuthorizeAdmin, Delete}
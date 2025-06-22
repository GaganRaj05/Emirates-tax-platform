const BACKEND_URL = 'https://api.emiratestax.me'


const checkAuth = async (role) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/check-auth?role=${role}`, {
            method:'GET',
            credentials:'include',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};

        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const userLogin = async (formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/sign-in`, {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData),
            credentials:'include',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};

        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const adminLogin = async (formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/admin-signin`, {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData),
            credentials:'include',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};

        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
const consultantSignIn = async (formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/consultant-signin`, {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData),
            credentials:'include',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};

        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}


const getUserInfo = async (user_id)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/get-account-info?user_id=${user_id}`, {
            method:'GET',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};

        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const updateUserInfo = async (formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/update-user-info`, {
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData)
        });

        const data = await response.json();
        if(!response.ok) return  {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }

}


const updatePassword = async(formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/update-user-password`,  {
            method:'PATCH',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData)
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const userSignup = async(formData)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/sign-up`, {
            method:'POST',
            body:JSON.stringify(formData),
            headers:{'Content-type':'application/json'}
        });

        const data = await response.json();

        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

export {consultantSignIn, adminLogin, checkAuth, userLogin, getUserInfo, updateUserInfo, updatePassword, userSignup}
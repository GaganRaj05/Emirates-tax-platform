const Backend_url = process.env.REACT_APP_BACKEND_URL;

const userLogin = async (formData, userType) => {
  try {
    console.log(userType);
    let response;
    if (userType === "admin") {
       response = await fetch(`${Backend_url}/auth/admin-signin`, {
        method:'POST',
        headers:{"Content-type":"application/json"},
        credentials:'include',
        body:JSON.stringify(formData)
      });

    } else if (userType === "consultant") {
       response = await fetch(`${Backend_url}/auth/consultant-signin`,{
                method:'POST',
        headers:{"Content-type":"application/json"},
        credentials:'include',
        body:JSON.stringify(formData)

      });
    } else {
       response = await fetch(`${Backend_url}/auth/sign-in`,{
                method:'POST',
        headers:{"Content-type":"application/json"},
        credentials:'include',
        body:JSON.stringify(formData)
      });

      
    }
    const data = await response.json();
      if(!response.ok) return {error:data};
      return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};


const userSignUp = async(formData) => {
    try {
        const response = await fetch(`${Backend_url}/auth/sign-up`, {
                    method:'POST',
        headers:{"Content-type":"application/json"},
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

const checkAuth = async() => {
  try { 
    const response = await fetch(`${Backend_url}/auth/check-auth`,{
      method:'GET',
      credentials:'include',
    } 
    )
            const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

  }
  catch(err) {
    console.log(err.message);
    return {error:err.message};
  }
}
export {userSignUp, userLogin, checkAuth};
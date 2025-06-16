const Backend_url = process.env.REACT_APP_BACKEND_URL;


const fetchDocumentsforAdmin = async() => {
    try {
        const response = await fetch(`${Backend_url}/docs/fetch-docs`,  {
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

const fetchDocumentsforConsultant = async(consultant_id) => {
    try {
        const response = await fetch(`${Backend_url}/docs/fetch-tax-docs?consultant_id=${consultant_id}`, {
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



const assignDocument = async(formData) => {
    try {
        const response = await fetch(`${Backend_url}/docs/assign-docs`, {
            method:'POST',
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

const uploadDocument = async(formData) => {
    try {
        const response = await fetch(`${Backend_url}/docs/upload-docs`, {
            method:'POST',
            body:formData
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

const uploadTaxReport = async(formData) => {
    try {   
        const response = await fetch(`${Backend_url}/docs/upload-tax-report`, {
            method:'POST',
            body:formData,
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

const fetchTaxReport = async(user_id) => {
    try {
        const response = await fetch(`${Backend_url}/docs/tax-reports?user_id=${user_id}`, {
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


export {fetchDocumentsforAdmin, fetchDocumentsforConsultant, fetchTaxReport, assignDocument,uploadDocument, uploadTaxReport};
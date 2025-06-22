const BACKEND_URL = 'https://api.emiratestax.me'


const uploadDocument = async (formData ) => {
    try {
        console.log(formData);
        const response = await fetch(`${BACKEND_URL}/api/docs/upload-docs`, {
            method:'POST',
            body:formData,
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message}
    }
}
const uploadTaxReport = async(formData ) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/docs/upload-tax-report`, {
            method:'POST',
            body:formData,
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    }
    catch(err) {
        console.log(err.message);
        return {error:err.message}
    }
}
const assignDocument = async(formData ) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/docs/assign-docs`, {
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
        return {error:err.message}
    }

}

const fetchDocumentsForReview = async (consultant_id ) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/docs/fetch-tax-docs?consultant_id=${consultant_id}`, {
            method:'GET',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message}
    }
}
const fetchDocuments = async( ) => {
    try {   
        const response = await fetch(`${BACKEND_URL}/api/docs/fetch-docs`, {
            method:'GET',
        });

        const data = await response.json();
        if(!response.ok) {
            return {error:data};
        }
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message}
    }
}

const fetchUserDocs = async (user_id ) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/docs/fetch-previous-docs?user_id=${user_id}`, {
            method:'GET',
        });

        const data = await response.json();
        if(!response.json) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message}
    }
}

const fetchTaxReports = async(user_id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/docs/tax-reports?user_id=${user_id}`, {
            method:'GET'
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    }
    catch(err ){
        console.log(err.message);
        return {error:err.message};
    }
}

export {uploadDocument, uploadTaxReport, fetchDocuments, fetchDocumentsForReview, fetchUserDocs, fetchTaxReports, assignDocument}
export const authFetch = async (url,options = {}) => {

    const headers = options.headers || {};

    const apiKey = "fa1bca911af85d5f023b30b1d3da820e";

    const fullUrl = `${url}?apiKey=${apiKey}`;

    try{
        const response = await fetch(fullUrl,{...options,headers});

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error || "Something went wrong!");
        }

        return data;
    }catch(error){
        console.error("Api Client error" , error.message);
        throw error;
    }
};  
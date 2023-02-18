export const handleError = (error)=>{
    let text = "";
    if(error.response){
        text = (error.response.data.text)
    }else{
        text = error.message
    }
    
    return text ;
}


async function setTimeOutPromisified(delay : number) {
    console.log("Starting timeout");
    return new Promise<void>((resolve, reject) => { 
        setTimeout(() => 
            {   
                // console.log("Timeout done after 10s"); 
                resolve();
            } 
        , delay)
    })
}


setTimeOutPromisified(10000).then(() => {
    console.log("Timeout promise resolved");
}).catch((err) => {
    console.error("Error in timeout promise:", err);
});


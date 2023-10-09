const MESSAGE = "This is the best moment to have a look at this website !";
const popup = (addDateTime(MESSAGE));
alert(popup);
console.log(popup);

function addDateTime(message){
    const dateTimeNow = new Date();
    return (dateTimeNow.toLocaleDateString() + " " + dateTimeNow.toLocaleTimeString() + ": " + message);
};
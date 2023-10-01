exports.getDate = function(name) {
    const dateTimeObject = new Date();
    greeting = `Hello ${name}. Current server date and time is ${dateTimeObject.toDateString} ${dateTimeObject.toTimeString}.`
    return greeting;
};
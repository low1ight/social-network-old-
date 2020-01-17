
export const errorHandler = (error) => {
    let obj = {};
    error.forEach(function(item) {
        let errorField = errorFieldHandler(item);
        obj[errorField] = `Incorrect ${errorField} link`
    });
    return obj

};

const errorFieldHandler = (error) => {
    const firsLetter = error.indexOf('>') + 1;
    const lastLetter = error.indexOf(')');
    return firstLetterToLowercase(error.slice(firsLetter,lastLetter))

};

const firstLetterToLowercase = (str) => {
    return str[0].toLowerCase() + str.slice(1)
};

const isValidd = (value) => {
    if (typeof value === "undefined" || typeof value === "null") return true;
    if (typeof value === "string" && value.trim().length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
  }



const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


const isValidObjectIdd = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  }

const isValidBody = function (data) {
    return Object.keys(data).length > 0;
};


let alphabetTestOfString = function (value) {
    let regex = /^[a-zA-Z\\s]{2,10}$/;
    if (regex.test(value)) {
        return true;
    }
    return false;
};



const isValidPassword = (password) => {
    if ( /^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password)) {
        return true
    }
}

const validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
}

const isValidStatus = (status) => {
    return [].includes(status);
  }

  


module.exports = {isValidd , isValidStatus, isValid, isValidObjectIdd,isValidBody, alphabetTestOfString, isValidPassword, validateEmail, }

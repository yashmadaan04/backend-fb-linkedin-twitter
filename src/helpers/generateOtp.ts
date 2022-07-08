const generateRandomNumber = () => {
    var minOtp = 100000;
    var maxOtp = 999999;
    return Math.floor(Math
    .random() * (maxOtp - minOtp + 1)) + minOtp;
}

export default generateRandomNumber;


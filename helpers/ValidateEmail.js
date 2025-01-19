function EmailValidateCheck(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  console.log("email check");
}

module.exports = EmailValidateCheck;

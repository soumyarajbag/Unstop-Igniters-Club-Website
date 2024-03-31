export const validateUserReg = (inputs: any) => {
    const errors = {
      name: "",
      phone: "",
      college: "",
      college_roll: "",
      roll: "",
      gender: "",
    };
    const regexPhone =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (inputs.name === "" || inputs.name === undefined || inputs.name === null) {
      errors.name = "Name is required";
    }
    if (inputs.phone === "" || inputs.phone === undefined || inputs.phone === null) {
      errors.phone = "Phone is required";
    } else if (!regexPhone.test(inputs.phone)) {
      errors.phone = "Invalid Phone Number";
    }
  
    if (inputs.college === "" || inputs.college === undefined || inputs.college === null) {
      errors.college = "College is required";
    }
    if (inputs.college_roll === "" || inputs.college_roll === undefined || inputs.college_roll === null) {
        errors.college_roll = "College Roll is required";
      }
    if (inputs.gender === "" || inputs.gender === undefined || inputs.gender === null) {
      errors.gender = "Gender is required";
    }
  
    return errors;
  };
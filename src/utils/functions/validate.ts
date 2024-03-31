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
  if (
    inputs.phone === "" ||
    inputs.phone === undefined ||
    inputs.phone === null
  ) {
    errors.phone = "Phone is required";
  } else if (!regexPhone.test(inputs.phone)) {
    errors.phone = "Invalid Phone Number";
  }

  if (
    inputs.college === "" ||
    inputs.college === undefined ||
    inputs.college === null
  ) {
    errors.college = "College is required";
  }
  if (
    inputs.college_roll === "" ||
    inputs.college_roll === undefined ||
    inputs.college_roll === null
  ) {
    errors.college_roll = "College Roll is required";
  }
  if (
    inputs.gender === "" ||
    inputs.gender === undefined ||
    inputs.gender === null
  ) {
    errors.gender = "Gender is required";
  }

  return errors;
};

interface teamError {
  email: string;
  phone: string;
  name: string;
}
export const validateEventReg = (
  inputs: any,
  eventType: string,
  participants: any,
  maxTeamSize: number,
  file: any
) => {
  const errors = {
    teamName: "",
    teamLeadEmail: "",
    fileName: "",
    college: "",
  };

  let uniqueEmails = new Set<string>();
  const teamErrors: teamError[] = [];
  const regexPhone =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (inputs.teamName === "") {
    errors.teamName = "Team Name is required";
  } else if (inputs.teamName.length < 3) {
    errors.teamName = "Team Name is too short";
  }

  if (inputs.teamLeadEmail === "") {
    errors.teamLeadEmail = "Team Lead Email is required";
  } else if (!regexEmail.test(inputs.teamLeadEmail)) {
    errors.teamLeadEmail = "Invalid Email";
  }
  if (inputs.college === "") {
    errors.college = "College is required";
  }
  if (eventType === "Submission" && inputs.fileName === "") {
    errors.fileName = "Payment Screenshot is required";
  }

  if (maxTeamSize > 1) {
    participants.forEach((participant: any, index: number) => {
      teamErrors[index] = {
        email: "",
        phone: "",
        name: "",
      };

      if (participant.email === "") {
        teamErrors[index].email = "Email is required";
      } else if (!regexEmail.test(participant.email)) {
        teamErrors[index].email = "Invalid Email";
      } else if (uniqueEmails.has(participant.email)) {
        teamErrors[index].email = `Email is already used in the team`;
      } else {
        uniqueEmails.add(participant.email);
      }

      if (participant.phone === "") {
        teamErrors[index].phone = "Phone is required";
      }
      else if (!regexPhone.test(participant.phone)) {
        teamErrors[index].phone = "Invalid Phone Number";
      } 

      if (participant.name === "") {
        teamErrors[index].name = "Name is required";
      }
    });
  }
  return { errors, teamErrors };
};

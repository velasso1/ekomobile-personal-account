import getAge from "./getAge";

const getIsIssueDateIsValid = (birthdate: Date, issueDate: Date) => {
  const age = getAge(birthdate);

  const getAllowedIssueDate = (birthdate: Date, plusYears: number, daysToShift: number): Date => {
    const allowedDate = new Date(birthdate.setFullYear(birthdate.getFullYear() + plusYears));
    allowedDate.setDate(allowedDate.getDate() + daysToShift);
    return allowedDate;
  };

  if (age < 20) {
    return issueDate >= getAllowedIssueDate(birthdate, 14, 1) && issueDate < getAllowedIssueDate(birthdate, 20, -1);
  } else if (age >= 20 && age < 45) {
    return issueDate >= getAllowedIssueDate(birthdate, 20, 1) && issueDate < getAllowedIssueDate(birthdate, 45, -1);
  } else if (age >= 45) {
    return issueDate >= getAllowedIssueDate(birthdate, 45, 1);
  }

  return true;
};

export default getIsIssueDateIsValid;

// Your random string generator
export const generateAccessCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const autoGenerateAccessCode = function (next) {
  // Generate code only if access is "Invite-code" and no code exists yet
  if (this.access === "Invite-code" && !this.accessCode) {
    this.accessCode = generateAccessCode();
  }
  // Clear the code if the user switches back to Public or Private
  else if (this.access !== "Invite-code") {
    this.accessCode = undefined;
  }
  next();
};

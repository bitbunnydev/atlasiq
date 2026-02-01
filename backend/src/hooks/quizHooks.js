import { generateAccessCode } from "../utils/codeGenerator.js";

export function autoGenerateAccessCode(next) {
  // 'this' refers to the new Quiz document being saved
  if (this.access === "Invite-code" && !this.accessCode) {
    this.accessCode = generateAccessCode;
  }
}

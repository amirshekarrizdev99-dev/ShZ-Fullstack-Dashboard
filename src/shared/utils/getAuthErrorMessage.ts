export function getAuthErrorMessage(message: string) {
  switch (message) {
    case "Invalid login credentials":
      return "Invalid email or password.";

    case "Email not confirmed":
      return "Please verify your email before signing in.";

    case "User already registered":
      return "An account with this email already exists.";

    default:
      return "Something went wrong. Please try again.";
  }
}

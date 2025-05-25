export class InvalidCredentialsError extends Error {
  constructor() {
    super("Login failed. Invalid credentials.");
    this.name = "InvalidCredentialsError";
  }
}

export class CredentialsMissingError extends Error {
  constructor() {
    super("Login failed. Missing credentials.");
  }
}

export class EnvironmentError extends Error {
  constructor(message?: string) {
    super(
      message ?? "Invalid environment. An environment variable is missing."
    );
    this.name = "EnvironmentError";
  }
}

export class SessionError extends Error {
  constructor(message?: string) {
    super(message ?? "Session expired. Login again.");
    this.name = "SessionError";
  }
}

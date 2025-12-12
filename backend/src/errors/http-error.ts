export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class AdminPrivilegesError extends HttpError {
  constructor(
    message = 'Administrator privileges are required to manage KidsProtect system rules.'
  ) {
    super(403, message);
    this.name = 'AdminPrivilegesError';
  }
}

export class ServerError extends Error {
  public errorCode: string;
  public errorMessage: string;

  constructor(errorCode: string, errorMessage: string) {
    super();

    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

export class API_Response<T> {
  private status: string;
  constructor(
    private message: string,
    private data?: T,
  ) {
    this.status = 'success';
    this.message = message;
    if (this?.data) {
      this.data = data;
    }
  }
}

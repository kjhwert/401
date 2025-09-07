export interface ApiResponse<T> {
  code: string;
  status: number;
  message: string;
  data: T;
}

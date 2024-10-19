export type ServerActionResponse<T = void> = {
  success: boolean;
  data?: T | null;
  message: string;
};

export type DatabaseQueryResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
};

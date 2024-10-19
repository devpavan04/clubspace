export type ServerActionResponse<T = void> = {
  success: boolean;
  message: string;
} & (T extends void ? { data?: never } : { data: T | null });

export type DatabaseQueryResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
};

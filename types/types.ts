export type OnSubmitServerActionResponse = {
  successMessage?: string;
  errorMessage?: string;
};

export type DataResponse<T> = {
  data: T | null;
  successMessage?: string;
  errorMessage?: string;
};

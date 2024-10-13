export type OnSubmitServerActionResponse = {
  successMessage?: string;
  errorMessage?: string;
};

export type DataResponse<T> = {
  data: T;
  successMessage?: string;
  errorMessage?: string;
};

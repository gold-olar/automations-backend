export type AuthorizedRequest = {
  user: {
    userId: string;
    email: string;
  };
} & Record<string, any>;

export interface SuccessResponse<T> {
  message: string;
  data: T;
  meta: Record<string, any>;
}

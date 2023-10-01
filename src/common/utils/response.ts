import { SuccessResponse } from '../common.interface';

export function successResponse<T>(
  message: string,
  data?: T,
  meta?: Record<string, any>,
): SuccessResponse<T> {
  return {
    message,
    data: data ?? null,
    meta: meta ?? null,
  };
}

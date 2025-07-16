import { ServiceErrorCode, ServiceErrorResult, ServiceResult, ServiceSuccessResult } from "../types/result.types";

// Re-export types for convenience
export type { ServiceErrorResult, ServiceResult, ServiceSuccessResult };
export { ServiceErrorCode };

/**
 * Custom error class for timeline service operations
 */
export class TimelineServiceError extends Error {
  public cause?: Error;
  
  constructor(
    message: string,
    public code: ServiceErrorCode,
    public details?: any,
    cause?: Error
  ) {
    super(message);
    this.name = 'TimelineServiceError';
    this.cause = cause;
  }
}

/**
 * Helper functions for creating service results
 */
export const ServiceResultHelper = {
  success: <T>(data: T): ServiceSuccessResult<T> => ({
    success: true,
    data,
  }),

  error: <T>(
    message: string,
    code: ServiceErrorCode,
    details?: any
  ): ServiceErrorResult => ({
    success: false,
    error: message,
    code,
    details,
  }),

  fromError: <T>(error: Error | TimelineServiceError): ServiceErrorResult => {
    if (error instanceof TimelineServiceError) {
      return {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
      };
    }
    return {
      success: false,
      error: error.message,
      code: ServiceErrorCode.OPERATION_FAILED,
      details: { originalError: error.name },
    };
  },
};

/**
 * Type guard to check if result is successful
 */
export function isSuccessResult<T>(result: ServiceResult<T>): result is ServiceSuccessResult<T> {
  return result.success;
}

/**
 * Type guard to check if result is an error
 */
export function isErrorResult<T>(result: ServiceResult<T>): result is ServiceErrorResult {
  return !result.success;
} 
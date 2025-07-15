/**
 * Service result types for consistent error handling across timeline services
 */

export type ServiceResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  code: ServiceErrorCode;
  details?: any;
};

export enum ServiceErrorCode {
  // Timeline errors
  TIMELINE_NOT_FOUND = 'TIMELINE_NOT_FOUND',
  TIMELINE_INVALID = 'TIMELINE_INVALID',
  TIMELINE_DUPLICATE_ID = 'TIMELINE_DUPLICATE_ID',
  
  // Element errors
  ELEMENT_NOT_FOUND = 'ELEMENT_NOT_FOUND',
  ELEMENT_INVALID = 'ELEMENT_INVALID',
  ELEMENT_CREATION_FAILED = 'ELEMENT_CREATION_FAILED',
  ELEMENT_TIMING_INVALID = 'ELEMENT_TIMING_INVALID',
  
  // Animation errors
  ANIMATION_INVALID = 'ANIMATION_INVALID',
  TEXT_EFFECT_INVALID = 'TEXT_EFFECT_INVALID',
  
  // Caption errors
  CAPTION_INVALID = 'CAPTION_INVALID',
  CAPTION_PROPS_INVALID = 'CAPTION_PROPS_INVALID',
  
  // General errors
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  OPERATION_FAILED = 'OPERATION_FAILED',
  INVALID_INPUT = 'INVALID_INPUT',
  SERVICE_NOT_INITIALIZED = 'SERVICE_NOT_INITIALIZED'
}

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
  success: <T>(data: T): ServiceResult<T> => ({
    success: true,
    data,
  }),

  error: <T>(
    message: string,
    code: ServiceErrorCode,
    details?: any
  ): ServiceResult<T> => ({
    success: false,
    error: message,
    code,
    details,
  }),

  fromError: <T>(error: Error | TimelineServiceError): ServiceResult<T> => {
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
export function isSuccessResult<T>(result: ServiceResult<T>): result is { success: true; data: T } {
  return result.success;
}

/**
 * Type guard to check if result is an error
 */
export function isErrorResult<T>(result: ServiceResult<T>): result is { 
  success: false; 
  error: string; 
  code: ServiceErrorCode; 
  details?: any 
} {
  return !result.success;
} 
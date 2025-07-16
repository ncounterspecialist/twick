
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
    
    OPERATION_NOT_FOUND = 'OPERATION_NOT_FOUND',
    // General errors
    VALIDATION_FAILED = 'VALIDATION_FAILED',
    OPERATION_FAILED = 'OPERATION_FAILED',
    INVALID_INPUT = 'INVALID_INPUT',
    SERVICE_NOT_INITIALIZED = 'SERVICE_NOT_INITIALIZED'
  }

/**
 * Service result types for  handling across timeline services
 */
export type ServiceResult<T> =
  | { success: true; data: T, operation: string }
  | { success: false; error: string; code: ServiceErrorCode; details?: T, operation: string };


export function serviceResultSuccess<T>({data, operation}: {data: T, operation: string}): ServiceResult<T> {
  return { success: true, data, operation };
} 

export function serviceResultError<T>({error, code, operation, details}: {error: string, code: ServiceErrorCode, operation: string, details?: T}): ServiceResult<T> {
  return { success: false, error, code, details, operation };
}

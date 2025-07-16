
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
 * Service result types for consistent error handling across timeline services
 */

export type ServiceSuccessResult<T> = {
    success: true;
    data: T;
  };
  
  export type ServiceErrorResult = {
    success: false;
    error: string;
    code: ServiceErrorCode;
    details?: any;
  };
  
  export type ServiceResult<T> = ServiceSuccessResult<T> | ServiceErrorResult;
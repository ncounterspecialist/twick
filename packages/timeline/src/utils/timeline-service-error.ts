import { ServiceErrorCode } from "../types/result.types";

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
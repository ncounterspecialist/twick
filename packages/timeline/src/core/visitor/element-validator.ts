import { ElementVisitor } from "./element-visitor";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { CircleElement } from "../elements/circle.element";
import { RectElement } from "../elements/rect.element";

export const VALIDATION_ERROR_CODE = {
  ELEMENT_NOT_FOUND: "ELEMENT_NOT_FOUND",
  ELEMENT_NOT_ADDED: "ELEMENT_NOT_ADDED",
  ELEMENT_NOT_UPDATED: "ELEMENT_NOT_UPDATED",
  ELEMENT_NOT_REMOVED: "ELEMENT_NOT_REMOVED",
  COLLISION_ERROR: "COLLISION_ERROR",
  INVALID_TIMING: "INVALID_TIMING",
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: string[],
    public warnings: string[] = []
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ElementValidator implements ElementVisitor<boolean> {
  private validateBasicProperties(element: any): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required basic properties
    if (!element.getId()) {
      errors.push("Element must have an ID");
    }

    if (!element.getType()) {
      errors.push("Element must have a type");
    }

    if (element.getStart() === undefined || element.getStart() === null) {
      errors.push("Element must have a start time (s)");
    }

    if (element.getEnd() === undefined || element.getEnd() === null) {
      errors.push("Element must have an end time (e)");
    }

    if (element.getStart() !== undefined && element.getEnd() !== undefined) {
      if (element.getStart() < 0) {
        errors.push("Start time cannot be negative");
      }
      
      if (element.getEnd() <= element.getStart()) {
        errors.push("End time must be greater than start time");
      }
    }

    if (!element.getName()) {
      warnings.push("Element should have a name for better identification");
    }

    if (!element.getTrackId()) {
      warnings.push("Element should have a track Id");
    }

    return { errors, warnings };
  }

  private validateTextElement(element: TextElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check text-specific properties
    const props = element.getProps();
    if (!props?.text) {
      errors.push("Text element must have text content");
    }

    if (props?.fontSize !== undefined && props.fontSize <= 0) {
      errors.push("Font size must be greater than 0");
    }

    if (props?.fontWeight !== undefined && props.fontWeight < 0) {
      errors.push("Font weight cannot be negative");
    }

    return { errors, warnings };
  }

  private validateVideoElement(element: VideoElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check video-specific properties
    const props = element.getProps();
    if (!props?.src) {
      errors.push("Video element must have a source URL");
    }

    if (props?.volume !== undefined && (props.volume < 0 || props.volume > 1)) {
      errors.push("Volume must be between 0 and 1");
    }

    if (props?.playbackRate !== undefined && props.playbackRate <= 0) {
      errors.push("Playback rate must be greater than 0");
    }

    // Note: frame property is protected, so we can't validate it directly
    // This would need to be validated through a public method if needed

    return { errors, warnings };
  }

  private validateAudioElement(element: AudioElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check audio-specific properties
    const props = element.getProps();
    if (!props?.src) {
      errors.push("Audio element must have a source URL");
    }

    if (props?.volume !== undefined && (props.volume < 0 || props.volume > 1)) {
      errors.push("Volume must be between 0 and 1");
    }

    if (props?.playbackRate !== undefined && props.playbackRate <= 0) {
      errors.push("Playback rate must be greater than 0");
    }

    return { errors, warnings };
  }

  private validateImageElement(element: ImageElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check image-specific properties
    const props = element.getProps();
    if (!props?.src) {
      errors.push("Image element must have a source URL");
    }

    // Note: frame property is protected, so we can't validate it directly
    // This would need to be validated through a public method if needed

    return { errors, warnings };
  }

  private validateCaptionElement(element: CaptionElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check caption-specific properties
    const props = element.getProps();
    if (!props?.text) {
      errors.push("Caption element must have text content");
    }

    return { errors, warnings };
  }

  private validateIconElement(element: IconElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];
    return { errors, warnings };
  }

  private validateCircleElement(element: CircleElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check circle-specific properties
    const props = element.getProps();
    if (props?.radius !== undefined && props.radius <= 0) {
      errors.push("Circle radius must be greater than 0");
    }

    // Note: frame property is protected, so we can't validate it directly
    // This would need to be validated through a public method if needed

    return { errors, warnings };
  }

  private validateRectElement(element: RectElement): { errors: string[]; warnings: string[] } {
    const basicValidation = this.validateBasicProperties(element);
    const errors = [...basicValidation.errors];
    const warnings = [...basicValidation.warnings];

    // Check rectangle-specific properties
    const props = element.getProps();
    if (props?.width !== undefined && props.width <= 0) {
      errors.push("Rectangle width must be greater than 0");
    }

    if (props?.height !== undefined && props.height <= 0) {
      errors.push("Rectangle height must be greater than 0");
    }

    // Note: frame property is protected, so we can't validate it directly
    // This would need to be validated through a public method if needed

    return { errors, warnings };
  }

  visitVideoElement(element: VideoElement): boolean {
    const validation = this.validateVideoElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Video element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitAudioElement(element: AudioElement): boolean {
    const validation = this.validateAudioElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Audio element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitImageElement(element: ImageElement): boolean {
    const validation = this.validateImageElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Image element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitTextElement(element: TextElement): boolean {
    const validation = this.validateTextElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Text element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitCaptionElement(element: CaptionElement): boolean {
    const validation = this.validateCaptionElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Caption element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitIconElement(element: IconElement): boolean {
    const validation = this.validateIconElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Icon element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitCircleElement(element: CircleElement): boolean {
    const validation = this.validateCircleElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Circle element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }

  visitRectElement(element: RectElement): boolean {
    const validation = this.validateRectElement(element);
    
    if (validation.errors.length > 0) {
      throw new ValidationError(
        `Rectangle element validation failed: ${validation.errors.join(', ')}`,
        validation.errors,
        validation.warnings
      );
    }
    
    return true;
  }
} 
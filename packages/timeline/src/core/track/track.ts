import { ElementJSON, TrackJSON } from "../../types";
import { generateShortUuid } from "../../utils/timeline.utils";
import { TrackElement } from "../elements/base.element";
import { ElementDeserializer } from "../visitor/element-deserializer";
import { ElementSerializer } from "../visitor/element-serializer";
import {
  ElementValidator,
  ValidationError,
} from "../visitor/element-validator";
import { TrackFriend } from "./track.friend";

export class Track {
  private id: string;
  private name: string;
  private type: string;
  private elements: TrackElement[];
  private validator: ElementValidator;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? `t-${generateShortUuid}`;
    this.type = "element";
    this.elements = [];
    this.validator = new ElementValidator();
  }

  /**
   * Create a friend instance for explicit access to protected methods
   * This implements the Friend Class Pattern
   * @returns TrackFriend instance
   */
  createFriend(): TrackFriend {
    return new TrackFriend(this);
  }

  /**
   * Friend method to add element (called by TrackFriend)
   * @param element The element to add
   * @param skipValidation If true, skips validation
   * @returns true if element was added successfully
   */
  addElementViaFriend(
    element: TrackElement,
    skipValidation: boolean = false
  ): boolean {
    return this.addElement(element, skipValidation);
  }

  /**
   * Friend method to remove element (called by TrackFriend)
   * @param element The element to remove
   */
  removeElementViaFriend(element: TrackElement): void {
    this.removeElement(element);
  }

  /**
   * Friend method to update element (called by TrackFriend)
   * @param element The element to update
   * @returns true if element was updated successfully
   */
  updateElementViaFriend(element: TrackElement): boolean {
    return this.updateElement(element);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  getElements(): ReadonlyArray<TrackElement> {
    return [...this.elements];
  }

  /**
   * Validates an element
   * @param element The element to validate
   * @returns true if valid, throws ValidationError if invalid
   */
  validateElement(element: TrackElement): boolean {
    return element.accept(this.validator);
  }

  getTrackDuration(): number {
    return this.elements?.length
      ? this.elements[this.elements.length - 1].getEnd()
      : 0;
  }

  /**
   * Adds an element to the track with validation
   * @param element The element to add
   * @param skipValidation If true, skips validation (use with caution)
   * @returns true if element was added successfully, throws ValidationError if validation fails
   */
  protected addElement(
    element: TrackElement,
    skipValidation: boolean = false
  ): boolean {
    element.setTrackId(this.id);
    if (skipValidation) {
      this.elements.push(element);
      return true;
    }

    try {
      const isValid = this.validateElement(element);
      if (isValid) {
        this.elements.push(element);
        return true;
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw error;
    }

    return false;
  }

  protected removeElement(element: TrackElement): void {
    const index = this.elements.findIndex((e) => e.getId() === element.getId());
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }

  /**
   * Updates an element in the track with validation
   * @param element The element to update
   * @returns true if element was updated successfully, throws ValidationError if validation fails
   */
  protected updateElement(element: TrackElement): boolean {
    try {
      const isValid = this.validateElement(element);
      if (isValid) {
        const index = this.elements.findIndex(
          (e) => e.getId() === element.getId()
        );
        if (index !== -1) {
          this.elements[index] = element;
          return true;
        }
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw error;
    }

    return false;
  }

  getElementById(id: string): Readonly<TrackElement> | undefined {
    const element = this.elements.find((e) => e.getId() === id);
    if (!element) return undefined;
    return element;
  }

  /**
   * Validates all elements in the track and returns combined result and per-element status
   * @returns Object with overall isValid and array of per-element validation results
   */
  validateAllElements(): {
    isValid: boolean;
    results: Array<{
      element: TrackElement;
      isValid: boolean;
      errors?: string[];
      warnings?: string[];
    }>;
  } {
    let validResult = true;
    const results = this.elements.map((element) => {
      try {
        const isValid = this.validateElement(element);
        if (!isValid) {
          validResult = false;
        }
        return { element, isValid };
      } catch (error) {
        if (error instanceof ValidationError) {
          validResult = false;
          return {
            element,
            isValid: false,
            errors: error.errors,
            warnings: error.warnings,
          };
        }
        return {
          element,
          isValid: false,
          errors: [error instanceof Error ? error.message : "Unknown error"],
        };
      }
    });
    return { isValid: validResult, results };
  }

  serialize(): TrackJSON {
    const serializer = new ElementSerializer();
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      elements: this.elements.map(
        (element) => element.accept(serializer) as ElementJSON
      ),
    };
  }

  static fromJSON(json: any): Track {
    const track = new Track(json.name, json.id);
    track.type = json.type;
    track.elements = (json.elements || []).map(ElementDeserializer.fromJSON);
    return track;
  }
}

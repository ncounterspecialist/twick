import {
Timeline,
TimelineElement,
TimelineData,
TimelineServiceConfig,
AddElementOptions,
EditElementOptions,
AnimationOptions,
CaptionProps,
TextEffectOptions,
} from "../../types";
import { generateShortUuid } from "../../utils/timeline.utils";
import { TimelineDataService } from "./timeline-data.service";
import { ElementService } from "../element/element.service";
import { AnimationService } from "../animation/animation.service";
import { CaptionService } from "../caption/caption.service";

/**
* Singleton Timeline Service that orchestrates all timeline operations
* Composes internal services for better separation of concerns
*/
export class TimelineService {
private dataService: TimelineDataService;
private elementService: ElementService;
private animationService: AnimationService;
private captionService: CaptionService;

constructor() {
this.dataService = new TimelineDataService();
this.elementService = new ElementService(this.dataService, () => this.dataService.getConfig());
this.animationService = new AnimationService(this.dataService);
this.captionService = new CaptionService(this.dataService);
}

initialize(config: TimelineServiceConfig): void {
this.dataService.initialize(config);
}

getTimelineData(): TimelineData | null {
return this.dataService.getTimelineData();
}

getTimeline(timelineId: string): Timeline | undefined {
return this.dataService.getTimeline(timelineId);
}

getAllTimelines(): Timeline[] {
return this.dataService.getAllTimelines();
}

setTimeline = (timeline: Timeline[], version?: number): TimelineData => {
return this.dataService.setTimeline(timeline, version);
};

// Create a new timeline
addTimeline = (timeline: Timeline) => {
return this.dataService.addTimeline(timeline);
};

editTimeline(
timelineId: string,
updates: Partial<Timeline>
): { timelineId: string; timeline: Timeline | undefined; version: number } {
return this.dataService.updateTimeline(timelineId, updates);
}

// Delete a timeline
deleteTimeline = (timelineId: string) => {
return this.dataService.deleteTimeline(timelineId);
};

addNewTimeline = (timelineData: Timeline | undefined) => {
const newTimelineId = `t-${generateShortUuid()}`;
const newTimeline: Timeline = {
id: newTimelineId,
type: "element",
name: "element",
...timelineData,
elements: timelineData?.elements?.length
? timelineData.elements.map((element) => ({
...element,
id: element.id || `e-${generateShortUuid()}`,
timelineId: newTimelineId,
}))
: [],
};
return this.dataService.addTimeline(newTimeline);
};

updateCaptionTimeline = (captionData: any) => {
return this.captionService.updateCaptionTimeline(captionData);
};

// Element Management
async addElement(options: AddElementOptions): Promise<{
timelineId: string;
element: TimelineElement;
version: number;
}> {
return this.elementService.addElement(options);
}

editElement(options: EditElementOptions): {
timelineId: string;
elementId: string;
element: TimelineElement;
version: number;
} {
return this.elementService.editElement(options);
}

deleteElement(
timelineId: string,
elementId: string
): { timelineId: string; elementId: string; version: number } {
return this.elementService.deleteElement(timelineId, elementId);
}

splitElement(timelineId: string, elementId: string, splitTime: number): { version: number } | undefined {
return this.elementService.splitElement(timelineId, elementId, splitTime);
}

editCaptionProps(options: {
timelineId: string;
elementId: string;
updates: Partial<TimelineElement>;
captionProps: CaptionProps;
applyPropsToAllSubtitle: boolean;
}): {
timelineId: string;
elementId: string;
element: TimelineElement | undefined;
updatedCaptionProps: CaptionProps | undefined;
version: number;
} {
return this.captionService.editCaptionProps(options);
}

async addSoloElement({
currentTime,
timelineId,
element,
}: {
currentTime: number;
timelineId: string;
element: TimelineElement;
}): Promise<{
timelineId: string;
element: TimelineElement;
version: number;
}> {
return this.elementService.addSoloElement({ currentTime, timelineId, element });
}

// Animation Management
setElementAnimation(options: AnimationOptions): {
timelineId: string;
elementId: string;
element: TimelineElement | null;
version: number;
} {
return this.animationService.setElementAnimation(options);
}

setTextEffect(options: TextEffectOptions): {
timelineId: string;
elementId: string;
element: TimelineElement | null;
version: number;
} {
return this.animationService.setTextEffect(options);
}

removeAnimation(timelineId: string, elementId: string): {
timelineId: string;
elementId: string;
element: TimelineElement | null;
version: number;
} {
return this.animationService.removeAnimation(timelineId, elementId);
}

removeTextEffect(timelineId: string, elementId: string): {
timelineId: string;
elementId: string;
element: TimelineElement | null;
version: number;
} {
return this.animationService.removeTextEffect(timelineId, elementId);
}

// Helper methods
getElement(elementId: string): TimelineElement | undefined {
return this.elementService.getElement(elementId);
}

getTotalDuration(): number {
return this.dataService.getTotalDuration();
}
}

// Export singleton instance
export default new TimelineService(); 
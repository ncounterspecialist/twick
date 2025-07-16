import { TimelineElement, Timeline, TimelineData, CaptionProps } from "../types";
import { TIMELINE_ACTION, TIMELINE_OPERATION } from "../helpers/constants";
import timelineService from "../services/timeline-service";
import { getDecimalNumber } from "../helpers/timeline.utils";

/**
 * Type for timeline operation context
 */
export interface TimelineOperationContext {
  timelineData: TimelineData | null;
  captionProps: CaptionProps;
  applyPropsToAllSubtitle: boolean;
  setSelectedItem: (item: TimelineElement | Timeline | null) => void;
  setTimelineAction: (action: string, payload?: any) => void;
  setLatestProjectVersion: (version: number) => void;
  pauseVideo: () => void;
}

/**
 * Base interface for operation handlers
 */
export interface TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void | Promise<void>;
}

/**
 * Load project operation handler
 */
export class LoadProjectHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    timelineService.setTimeline(
      payload?.timeline || [],
      payload?.version || 0
    );
    context.setTimelineAction(
      TIMELINE_ACTION.SET_PROJECT_DATA,
      timelineService.getTimelineData()
    );
  }
}

/**
 * Set timeline operation handler
 */
export class SetTimelineHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    timelineService.setTimeline(payload?.timeline, payload?.version);
  }
}

/**
 * Add new timeline operation handler
 */
export class AddNewTimelineHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    context.pauseVideo();
    const data = timelineService.addNewTimeline(payload);
    context.setSelectedItem(data?.timeline);
  }
}

/**
 * Update caption timeline operation handler
 */
export class UpdateCaptionTimelineHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    context.pauseVideo();
    timelineService.updateCaptionTimeline(payload);
    context.setSelectedItem(null);
  }
}

/**
 * Delete item operation handler
 */
export class DeleteItemHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    context.pauseVideo();
    const { timelineId, id } = payload;
    
    if ((id || "").startsWith("e-")) {
      timelineService.deleteElement(timelineId, id);
      context.setSelectedItem(null);
    } else if ((id || "").startsWith("t-")) {
      timelineService.deleteTimeline(id);
      context.setSelectedItem(null);
    }
  }
}

/**
 * Add element operation handler
 */
export class AddElementHandler implements TimelineOperationHandler {
  async execute(payload: any, context: TimelineOperationContext): Promise<void> {
    context.pauseVideo();
    const { element, timelineId } = payload;
    
    if (timelineId) {
      const selectedTimeline = context.timelineData?.timeline?.find(
        (timeline) => timeline.id === timelineId
      );
      let s = 0;
      if (selectedTimeline && selectedTimeline.elements.length) {
        s = selectedTimeline.elements[selectedTimeline.elements.length - 1].e;
      }
      
      try {
        const data = await timelineService.addElement({
          timelineId,
          type: element.type,
          props: element.props,
          s, 
          e: element.e,
          name: element.name
      });
        
        if (data?.element) {
          setTimeout(() => {
            context.setSelectedItem(data.element);
          }, 1000);
        }
      } catch (error) {
        console.error('Failed to add element:', error);
      }
    }
  }
}

/**
 * Update element operation handler
 */
export class UpdateElementHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    context.pauseVideo();
    const { elementId, timelineId, updates } = payload;
    timelineService.editElement({ timelineId, elementId, updates, noSelection: false });
  }
}

/**
 * Update caption props operation handler
 */
export class UpdateCaptionPropsHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    context.pauseVideo();
    const { elementId, timelineId, updates } = payload || {};
    const { element, updatedCaptionProps } = timelineService.editCaptionProps({
      timelineId,
      elementId,
      updates,
      captionProps: context.captionProps,
      applyPropsToAllSubtitle: context.applyPropsToAllSubtitle,
    });
    
    if (element) {
      context.setSelectedItem(element);
    }
    if (context.applyPropsToAllSubtitle) {
      context.setTimelineAction(
        TIMELINE_ACTION.SET_CAPTION_PROPS,
        updatedCaptionProps
      );
    }
    context.setTimelineAction(TIMELINE_ACTION.NONE, null);
  }
}

/**
 * Set project script operation handler
 */
export class SetProjectScriptHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    const timeline = payload?.input?.timeline;
    context.setTimelineAction(TIMELINE_ACTION.RESET_HISTORY, null);
    timelineService.setTimeline(timeline, 0);
  }
}

/**
 * Set element animation operation handler
 */
export class SetElementAnimationHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    timelineService.setElementAnimation(payload);
  }
}

/**
 * Set text effect operation handler
 */
export class SetTextEffectHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    timelineService.setTextEffect(payload);
  }
}

/**
 * Split element operation handler
 */
export class SplitElementHandler implements TimelineOperationHandler {
  execute(payload: any, context: TimelineOperationContext): void {
    const { element: elementToSplit, currentTime } = payload;
    if (elementToSplit?.id.startsWith("e-")) {
      context.pauseVideo();
      timelineService.splitElement(
        elementToSplit.timelineId,
        elementToSplit.id,
        getDecimalNumber(currentTime)
      );
    }
    context.setSelectedItem(null);
  }
}

/**
 * Add solo element operation handler
 */
export class AddSoloElementHandler implements TimelineOperationHandler {
  async execute(payload: any, context: TimelineOperationContext): Promise<void> {
    try {
      const data = await timelineService.addSoloElement(payload);
      if (data?.element) {
        context.setSelectedItem(data.element);
      }
    } catch (error) {
      console.error('Failed to add solo element:', error);
    }
  }
}

/**
 * Operation handler registry
 */
export const OperationHandlers: Record<string, TimelineOperationHandler> = {
  [TIMELINE_OPERATION.LOAD_PROJECT]: new LoadProjectHandler(),
  [TIMELINE_OPERATION.SET_TIMELINE]: new SetTimelineHandler(),
  [TIMELINE_OPERATION.ADD_NEW_TIMELINE]: new AddNewTimelineHandler(),
  [TIMELINE_OPERATION.UPDATE_CAPTION_TIMELINE]: new UpdateCaptionTimelineHandler(),
  [TIMELINE_OPERATION.DELETE_ITEM]: new DeleteItemHandler(),
  [TIMELINE_OPERATION.ADD_ELEMENT]: new AddElementHandler(),
  [TIMELINE_OPERATION.UPDATE_ELEMENT]: new UpdateElementHandler(),
  [TIMELINE_OPERATION.UPDATE_CAPTION_PROPS]: new UpdateCaptionPropsHandler(),
  [TIMELINE_OPERATION.SET_PROJECT_SCRIPT]: new SetProjectScriptHandler(),
  [TIMELINE_OPERATION.SET_ELEMENT_ANIMATION]: new SetElementAnimationHandler(),
  [TIMELINE_OPERATION.SET_TEXT_EFFECT]: new SetTextEffectHandler(),
  [TIMELINE_OPERATION.SPLIT_ELEMENT]: new SplitElementHandler(),
  [TIMELINE_OPERATION.ADD_SOLO_ELEMENT]: new AddSoloElementHandler(),
};

/**
 * Execute timeline operation with proper error handling
 */
export async function executeTimelineOperation(
  operation: { type: string; payload?: any } | null | undefined,
  context: TimelineOperationContext
): Promise<void> {
  if (!operation?.type) {
    return;
  }

  const handler = OperationHandlers[operation.type];
  if (!handler) {
    console.warn(`Unknown timeline operation: ${operation.type}`);
    return;
  }

  try {
    await handler.execute(operation.payload, context);
  } catch (error) {
    console.error(`Error executing timeline operation ${operation.type}:`, error);
    // Could add user notification here
  }
} 
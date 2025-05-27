import { all, Reference } from "@revideo/core";

export function* addAnimations({ elementRef }: { elementRef: Reference<any>;}) {
    yield elementRef();
    const animations:any[] = []
    return yield* all(...animations);
}
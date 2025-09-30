import { ANIMATIONS } from "@twick/video-editor";
import { ElementAnimation, TrackElement } from "@twick/timeline";
import type { PropertiesPanelProps } from "../../types";

export function Animation({
  selectedElement,
  updateElement,
}: PropertiesPanelProps) {
  if (!(selectedElement instanceof TrackElement)) return null;

  const currentAnimation = selectedElement?.getAnimation();

  const handleUpdateAnimation = (props: {
    name?: string;
    interval?: number;
    duration?: number;
    intensity?: number;
    animate?: "enter" | "exit" | "both";
    mode?: "in" | "out";
    direction?: "up" | "down" | "left" | "right" | "center";
  }) => {
    if (!selectedElement) return;

    let animation = currentAnimation;

    // If name is provided and empty, remove animation
    if (props.name === "") {
      selectedElement.setAnimation(undefined);
      updateElement?.(selectedElement);
      return;
    }

    // Find animation definition
    const animationDef = ANIMATIONS.find(
      (a) => a.name === (props.name || currentAnimation?.getName())
    );
    if (!animationDef) return;

    // Create new animation if none exists or name is changing
    if (!animation || (props.name && props.name !== animation.getName())) {
      animation = new ElementAnimation(
        props.name || currentAnimation?.getName() || ANIMATIONS[0].name
      );
      // Set default values for new animation
      animation.setInterval(animationDef.interval || 1);
      animation.setDuration(animationDef.duration || 1);
      animation.setIntensity(animationDef.intensity || 1);
      animation.setAnimate(animationDef.animate || "enter");
      if (animationDef.mode) animation.setMode(animationDef.mode);
      if (animationDef.direction)
        animation.setDirection(animationDef.direction);
    }

    // Update animation properties with validation
    if (props.interval !== undefined) {
      const [min, max] = animationDef.options?.interval || [0.1, 5];
      animation.setInterval(Math.min(Math.max(props.interval, min), max));
    }
    if (props.duration !== undefined) {
      const [min, max] = animationDef.options?.duration || [0.1, 5];
      animation.setDuration(Math.min(Math.max(props.duration, min), max));
    }
    if (props.intensity !== undefined) {
      const [min, max] = animationDef.options?.intensity || [0.1, 2];
      animation.setIntensity(Math.min(Math.max(props.intensity, min), max));
    }
    if (
      props.animate &&
      animationDef.options?.animate?.includes(props.animate)
    ) {
      animation.setAnimate(props.animate);
    }
    if (props.mode && animationDef.options?.mode?.includes(props.mode)) {
      animation.setMode(props.mode);
    }
    if (
      props.direction &&
      animationDef.options?.direction?.includes(props.direction)
    ) {
      animation.setDirection(props.direction);
    }

    // Update element with new/modified animation
    selectedElement.setAnimation(animation);
    updateElement?.(selectedElement);
  };

  return (
    <div className="panel-container">
      <div className="panel-title">Animations</div>
      {/* Animation Selection */}
      <div className="panel-section">
        <label className="label-dark">Type</label>
        <select
          value={currentAnimation?.getName() || ""}
          onChange={(e) => handleUpdateAnimation({ name: e.target.value })}
          className="select-dark w-full"
        >
          <option value="">No Animation</option>
          {ANIMATIONS.map((animation) => (
            <option key={animation.name} value={animation.name}>
              {animation.name.charAt(0).toUpperCase() + animation.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Animation Options */}
      {currentAnimation && (
        <>
            {/* Get current animation definition */}
            {(() => {
              const animationDef = ANIMATIONS.find(
                (a) => a.name === currentAnimation.getName()
              );
              if (!animationDef || !animationDef.options) return null;

              return (
                <>
                  {/* Animate */}
                  {animationDef.options?.animate && (
                    <div className="panel-section">
                      <label className="label-dark">When to Animate</label>
                      <select
                        value={currentAnimation.getAnimate()}
                        onChange={(e) =>
                          handleUpdateAnimation({
                            animate: e.target.value as
                              | "enter"
                              | "exit"
                              | "both",
                          })
                        }
                        className="select-dark w-full"
                      >
                        {animationDef.options?.animate.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Direction */}
                  {animationDef.options?.direction && (
                    <div className="panel-section">
                      <label className="label-dark">Direction</label>
                      <select
                        value={currentAnimation.getDirection()}
                        onChange={(e) =>
                          handleUpdateAnimation({
                            direction: e.target.value as
                              | "up"
                              | "down"
                              | "left"
                              | "right"
                              | "center",
                          })
                        }
                        className="select-dark w-full"
                      >
                        {animationDef.options?.direction.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Mode */}
                  {animationDef.options?.mode && (
                    <div className="panel-section">
                      <label className="label-dark">Mode</label>
                      <select
                        value={currentAnimation.getMode()}
                        onChange={(e) =>
                          handleUpdateAnimation({
                            mode: e.target.value as "in" | "out",
                          })
                        }
                        className="select-dark w-full"
                      >
                        {animationDef.options?.mode.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Duration */}
                  {animationDef.options?.duration && (
                    <div className="panel-section">
                      <label className="label-dark">Duration (seconds)</label>
                      <div className="slider-container">
                        <input
                          type="range"
                          min={animationDef.options?.duration[0]}
                          max={animationDef.options?.duration[1]}
                          step="0.1"
                          value={currentAnimation.getDuration()}
                          onChange={(e) =>
                            handleUpdateAnimation({
                              duration: Number(e.target.value),
                            })
                          }
                          className="slider-purple"
                        />
                        <span className="slider-value">{currentAnimation.getDuration()}</span>
                      </div>
                    </div>
                  )}

                  {/* Interval */}
                  {animationDef.options?.interval && (
                    <div className="panel-section">
                      <label className="label-dark">Interval (seconds)</label>
                      <div className="slider-container">
                        <input
                          type="range"
                          min={animationDef.options?.interval[0]}
                          max={animationDef.options?.interval[1]}
                          step="0.1"
                          value={currentAnimation.getInterval()}
                          onChange={(e) =>
                            handleUpdateAnimation({
                              interval: Number(e.target.value),
                            })
                          }
                          className="slider-purple"
                        />
                        <span className="slider-value">{currentAnimation.getInterval()}</span>
                      </div>
                    </div>
                  )}

                  {/* Intensity */}
                  {animationDef.options?.intensity && (
                    <div className="panel-section">
                      <label className="label-dark">Intensity</label>
                      <div className="slider-container">
                        <input
                          type="range"
                          min={animationDef.options?.intensity[0]}
                          max={animationDef.options?.intensity[1]}
                          step="0.1"
                          value={currentAnimation.getIntensity()}
                          onChange={(e) =>
                            handleUpdateAnimation({
                              intensity: Number(e.target.value),
                            })
                          }
                          className="slider-purple"
                        />
                        <span className="slider-value">{currentAnimation.getIntensity()}</span>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
        </>
      )}
    </div>
  );
}

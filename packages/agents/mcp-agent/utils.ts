export const uploadDataToFile = async (data: any) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  formData.append("file", blob, "data.json");

  const res = await fetch(process.env.UPLOAD_API_URL ?? "", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to upload data to file: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
};

export const processCaptions = async (project: any) => {
  try {
    const uploadResult = await uploadDataToFile(project);
    // Use stderr for logs so stdio JSON-RPC traffic on stdout is not corrupted.
    console.error("Upload Result", uploadResult);
    return uploadResult;
  } catch (err) {
    console.error("Error processing captions", err);
    return {
      success: false,
      error: "Error uploading project to file",
      project: project,
    };
  }
};

export const processCaptionsToProject = async ({
  captions,
  videoUrl,
  duration,
  videoSize,
}: {
  captions: any;
  videoUrl: string;
  duration: number;
  videoSize: { width: number; height: number };
}) => {
  return {
    properties: {
      width: videoSize.width || 720,
      height: videoSize.height || 1280,
    },
    tracks: [
      {
        id: "video",
        type: "video",
        elements: [
          {
            id: "video",
            type: "video",
            s: 0,
            e: duration,
            props: {
              src: videoUrl,
              width: videoSize.width || 720,
              height: videoSize.height || 1280,
            },
          },
        ],
      },
      {
        id: "caption",
        type: "caption",
        props: {
          capStyle: "highlight_bg",
          font: {
            size: 46,
            weight: 700,
            family: "Bangers",
          },
          colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
          },
          lineWidth: 0.35,
          stroke: "#000000",
          fontWeight: 700,
          shadowOffset: [-3, 3],
          shadowColor: "#000000",
          x: 0,
          y: 200,
          applyToAll: true,
        },
        elements: captions.map((caption: any, index: number) => ({
          id: `caption-${index}`,
          type: "caption",
          s: caption.s / 1000,
          e: caption.e / 1000,
          t: caption.t,
        })),
      },
    ],
    version: 1,
  };
};

export const getTwickStudioLink = (uploadResult: any) => {
  if (!uploadResult?.success) return;

  const fileUrl: string | undefined = uploadResult.result?.[0]?.url;
  if (!fileUrl) return;

  const template = process.env.TWICK_STUDIO_URL;
  if (!template) return;

  // If TWICK_STUDIO_URL contains a $project placeholder, substitute it
  if (template.includes("$project")) {
    return template.replace("$project", encodeURIComponent(fileUrl));
  }
};

export const returnProjectAsTwickStudioLink = async (project: any) => {
  const uploadResult = await uploadDataToFile(project);
  const twickStudioLink = getTwickStudioLink(uploadResult);
  if (twickStudioLink) {
    return {
      content: [
        { type: "text", text: `Open link in browser: ${twickStudioLink}` },
      ],
      structuredContent: { success: true, result: twickStudioLink },
    };
  }
  return returnProjectAsFile(project);
};

export const returnProjectAsFile = (project: any) => {
  const data = Buffer.from(JSON.stringify(project, null, 2)).toString("base64");
  const result = {
    file: {
      name: "project.json",
      content: data,
      encoding: "base64",
      mimeType: "application/json",
    },
    metadata: {
      size: data.length,
      created: new Date().toISOString(),
    },
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
};

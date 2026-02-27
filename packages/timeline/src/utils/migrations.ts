import type { ElementJSON, ProjectJSON } from "../types";

export const CURRENT_PROJECT_VERSION = 2;

type ProjectMigration = (project: ProjectJSON) => ProjectJSON;

const migrateToV1: ProjectMigration = (project) => ({
  ...project,
  version: 1,
  tracks: project.tracks || [],
});

const migrateToV2: ProjectMigration = (project) => ({
  ...project,
  version: 2,
  metadata: project.metadata ?? {},
  tracks: (project.tracks || []).map((track) => ({
    ...track,
    elements: (track.elements || []).map((element: ElementJSON) => ({
      ...element,
      metadata: element.metadata ?? undefined,
    })),
  })),
});

const MIGRATIONS: Record<number, ProjectMigration> = {
  1: migrateToV1,
  2: migrateToV2,
};

export function migrateProject(
  project: ProjectJSON,
  targetVersion: number = CURRENT_PROJECT_VERSION
): ProjectJSON {
  const safeProject: ProjectJSON = {
    tracks: project?.tracks || [],
    version: Math.max(0, project?.version || 0),
    ...(project?.watermark !== undefined && { watermark: project.watermark }),
    ...(project?.backgroundColor !== undefined && {
      backgroundColor: project.backgroundColor,
    }),
    ...(project?.metadata !== undefined && { metadata: project.metadata }),
  };

  let currentVersion = safeProject.version;
  let migrated = safeProject;

  while (currentVersion < targetVersion) {
    const nextVersion = currentVersion + 1;
    const migration = MIGRATIONS[nextVersion];
    if (!migration) break;
    migrated = migration(migrated);
    currentVersion = nextVersion;
  }

  return {
    ...migrated,
    version: Math.max(currentVersion, migrated.version),
  };
}

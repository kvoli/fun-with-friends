/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getArtifactFilter = state => state.filters.artifactFilter;
const getArtifacts = state => state.artifacts;

export const getVisibleArtifacts = createSelector(
  [getArtifactFilter, getArtifacts],
  (artifactFilter, artifacts) =>
    artifacts.filter(
      artifact =>
        artifact.title
          .toLowerCase()
          .trim()
          .includes(artifactFilter.toLowerCase().trim()) || '^\\s*$'.match(artifactFilter)
    )
);

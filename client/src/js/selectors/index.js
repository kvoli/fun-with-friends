/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getArtifacts = state => state.artifacts;
const getCircles = state => state.circle.circles;
const getArtifactFilter = state => state.filters.artifactFilter;
const getArtifactCircleFilter = state => state.filters.circleArtifactFilter;
const getPersonalFilter = state => state.filters.personalFilter;

export const getPersonalArtifacts = createSelector(
  [getPersonalFilter, getArtifacts],
  (personal, artifacts) => artifacts.filter(artifact => artifact.uploader === personal)
);

export const getCircleArtifacts = createSelector(
  [getArtifactCircleFilter, getArtifacts, getCircles],
  (circlesIDs, artifacts, circles) =>
    artifacts.filter(artifact => !Object.keys(circles).map(key => circlesIDs.includes(key) && circles[key].artifacts.includes(artifact.id)))
);

export const getVisibleArtifacts = createSelector(
  [getArtifactFilter, getCircleArtifacts, getPersonalArtifacts],
  (artifactFilter, artifacts, personal) =>
    artifacts.concat(personal).filter(
      artifact =>
        artifact.title
          .toLowerCase()
          .trim()
          .includes(artifactFilter.toLowerCase().trim()) || '^\\s*$'.match(artifactFilter)
    )
);

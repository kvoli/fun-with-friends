/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getArtifacts = state => state.artifacts;
const getCircles = state => state.circle.circles;
const getArtifactFilter = state => state.filters.artifactFilter;
const getArtifactCircleFilter = state => state.filters.circleArtifactFilter;
const getPersonalFilter = state => state.filters.personalFilter;
const getAllFilter = state => state.filters.allFilter;

export const getPersonalArtifacts = createSelector(
  [getPersonalFilter, getArtifacts],
  (personal, artifacts) => artifacts.filter(artifact => artifact.uploader === personal)
);

export const getCircleArtifacts = createSelector(
  [getArtifactCircleFilter, getArtifacts, getCircles],
  (circleIDs, artifacts, circles) => {
    const circleArtifactIDs = circleIDs.map(id => circles[id].artifacts).flat();
    return artifacts.filter(artifact => circleArtifactIDs.includes(artifact.id));
  }
);

export const getVisibleArtifacts = createSelector(
  [getArtifactFilter, getCircleArtifacts, getPersonalArtifacts, getAllFilter, getArtifacts],
  (artifactFilter, artifacts, personal, allFilter, allArtifacts) => {
    switch (allFilter) {
      case true:
        return allArtifacts.filter(artifact => 
          artifact.title
              .toLowerCase()
              .trim()
              .includes(artifactFilter.toLowerCase().trim()) || '^\\s*$'.match(artifactFilter)
        );
      default:
        // this introduced duplicates so...
        const a = artifacts.concat(personal).filter(artifact =>
          artifact.title
            .toLowerCase()
            .trim()
            .includes(artifactFilter.toLowerCase().trim()) || '^\\s*$'.match(artifactFilter)
        );
        // remove duplicates in O(n)!!!
        return Array.from(new Set(a));
    };
  }
);

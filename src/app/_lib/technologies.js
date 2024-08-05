/**
 * Find the icon sources from name
 * @param {string[]} names - Array of technology names (e.g., ["React", "Typescript"]).
 * @returns {string[]} - Array of icon sources from devicon.
 */

import skillsData from "../../data/skills.json";

export function getIconSourcesByNames(names) {
  const result = [];

  skillsData.forEach((category) => {
    category.data.forEach((skill) => {
      if (names.includes(skill.name)) {
        result.push(skill.devicon_src);
      }
    });
  });

  return result;
}

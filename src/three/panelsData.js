import * as THREE from "three";

const techData = [
  { id: "React", level: 80 },
  { id: "Node.js", level: 70 },
  { id: "PHP", level: 75 },
  { id: "C#", level: 70 },
  { id: "Three.js", level: 65 },
  { id: "Blazor", level: 60 },
  { id: "ASP.NET", level: 75 },
  { id: "SQL", level: 80 },
  { id: "Python", level: 85 },
  { id: "Java", level: 70 },
  { id: "Docker", level: 75 },
];

const radius = 5;

const cols = 4;
const spacing = 4;

export const panels = techData.map((tech, i) => {
  const row = Math.floor(i / cols);
  const col = i % cols;

  return {
    ...tech,
    position: new THREE.Vector3(
      (col - cols / 2) * spacing,
      0,
      (row - 1) * spacing
    ),
  };
});
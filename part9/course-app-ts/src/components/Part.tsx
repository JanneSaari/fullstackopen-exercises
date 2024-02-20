import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  {switch (coursePart.kind) {
    case "basic":
      return (
      <p>
        <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
        {coursePart.description}
      </p>
      )
    case "group":
      return (
        <p>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          Course has {coursePart.groupProjectCount} group projects
        </p>
        )
    case "background":
      return (
        <p>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          {coursePart.description}
          <br></br>
          Course background material: {coursePart.backgroundMaterial}
        </p>
        )
    case "special":
      return (
      <p>
        <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
        {coursePart.description}
        <br></br>
        Required skills: {coursePart.requirements.map(req => req + ' ')}
      </p>
      )
    default:
      return assertNever(coursePart)
  }}
}

export default Part;
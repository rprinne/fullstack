import { CoursePart } from "../types";

interface PartProps {
  CoursePart: CoursePart;
}

export const Part = (props: PartProps): JSX.Element => {
  switch (props.CoursePart.kind) {
    case "basic":
      return (
          <div>
          <p><b>{props.CoursePart.name} {props.CoursePart.exerciseCount}</b></p>
          <p><em>{props.CoursePart.description}</em></p>
          </div>
        )
    case "group":
      return (
        <div>
        <p><b>{props.CoursePart.name} {props.CoursePart.exerciseCount}</b></p>
        <p>Group projects: {props.CoursePart.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
        <p><b>{props.CoursePart.name} {props.CoursePart.exerciseCount}</b></p>
        <p><em>{props.CoursePart.description}</em></p>
        <p>Material: {props.CoursePart.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
        <p><b>{props.CoursePart.name} {props.CoursePart.exerciseCount}</b></p>
        <p><em>{props.CoursePart.description}</em></p>
        <p>required skills: {props.CoursePart.requirements.join(", ")}</p>
        </div>
      )
    default:
      return <div></div>
  }
};
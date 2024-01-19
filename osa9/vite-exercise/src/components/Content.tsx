import { Part } from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: Array<CoursePart>;
}

export const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((cp: CoursePart) =>
        <Part CoursePart={cp}/> )}
    </div>
  );
};
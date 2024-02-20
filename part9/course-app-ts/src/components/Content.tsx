import { CoursePart } from "../types";
import Part from "./Part";

export interface ContentProps {
  contents: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.contents.map(part => {
        return <Part coursePart={part}></Part>
      }
      )}
    </div>
  )
}

export default Content;
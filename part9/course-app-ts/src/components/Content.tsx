export interface ContentProps {
  contents: {
    name: string;
    exerciseCount: number;
  }[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.contents.map((content) => {
        return <p>{content.name} {content.exerciseCount}</p>;
      }
      )}
    </div>
  )
}

export default Content;
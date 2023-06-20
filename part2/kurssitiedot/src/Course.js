const Course = ({ course }) => {
  console.log("Course", course);
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Content = ({ course }) => {
  const content = course.parts;
  console.log("Content", content);
  return (
    <div>
      {content.map((element) => (
        <Part
          key={element.id}
          name={element.name}
          exercises={element.exercises}
        ></Part>
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name}: {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const parts = props.course.parts;
  const initialValue = 0;
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  );
  console.log("Total:", total);
  return <b>Number of exercises: {total}</b>;
};

export default Course;

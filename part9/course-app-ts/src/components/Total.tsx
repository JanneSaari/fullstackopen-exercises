export interface TotalProps {
  totalExercises: number
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises {props.totalExercises}
      </p>
    </div>
  )
}

export default Total;
interface TotalProps {
  totalExercises: number;
}

export const Total = (props: TotalProps): JSX.Element => {
  return <p>Number of exercises {props.totalExercises}</p>;
};
interface Props {
  message: string;
}

export const Notification = ({ message } : Props): JSX.Element => {
  return (<div><p style={{color: "red"}}>{message}</p></div>);
};
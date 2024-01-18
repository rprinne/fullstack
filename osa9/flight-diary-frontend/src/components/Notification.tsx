interface NotificationProps {
  message: string;
}

export const Notification = (props: NotificationProps): JSX.Element => {
  return (<div><p style={{color: "red"}}>{props.message}</p></div>);
};
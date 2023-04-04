import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      style={{color: props.color, border: ` solid 2px ${props.color}`}}
      className={classes.btn}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      {props.children}
    </button>
  );
}

export default Button
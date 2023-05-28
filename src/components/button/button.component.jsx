import "./button.component.scss"
const BUTTON_TYPE_CLASSES = {
     inverted:"inverted",
     google: "google-sign-in"
}
const Button = ({children,buttonType,...otherProperties})=>{
    return(
        <button className={`${BUTTON_TYPE_CLASSES[buttonType]} button-container`} {...otherProperties}>{children}</button>
    )
}
export default Button
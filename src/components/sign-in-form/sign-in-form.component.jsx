import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import Button from "../button/button.component"
import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { signInWithGooglePopup,createUserDocumentFromAuth, SignInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
const SignInForm=()=>{
   const {setCurrentUser} = useContext(UserContext)
    const defaultFormFields={
        email:"",
        password:"",
    }
    const [formFields,setFormFields]=useState(defaultFormFields)
    const {email,password} = formFields
    const onChangeHandler=(event)=>{
         const {name,value}=event.target
         setFormFields({...formFields,[name]:value})
         console.log(formFields)
    } 
    const signInWithGoogle=async()=>{
      const {user}=await signInWithGooglePopup()
      await createUserDocumentFromAuth(user)
     } 
    const resetForms=()=>{
         setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event)=>{
         event.preventDefault()
         try{
            const {user}=await SignInUserWithEmailAndPassword(email,password)
            setCurrentUser(user)
            resetForms()
         }
         catch(error){
          switch(error.code){
            case "auth/wrong-password":
               alert("Password is incorrect for the user")
               break
            case "auth/user-not-found":
               alert("No user associated with this user")
               break
            default:
               console.log(error)
          }
    }
   }

    return(
       <div className ="sign-in-container">
        <h2>ALready have an account?</h2>
        <span>Sign In with Email and Password</span>
        <form onSubmit={handleSubmit}>
         <FormInput label ="Email" type ="email" required onChange={onChangeHandler} name="email" value={email}/>
         <FormInput label ="Password" type ="password" required onChange={onChangeHandler} name="password" value={password}/>
         <div className="buttons-container">
           <Button type ="submit">Sign In</Button>
           <Button buttonType="google" type ="button" onClick={signInWithGoogle}>Google Sign In</Button>
         </div>
        </form>
       </div>
    )
}

export default SignInForm
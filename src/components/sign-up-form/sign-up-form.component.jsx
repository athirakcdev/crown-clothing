import { useContext, useState } from "react"
import { createUserAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"
import Button from "../button/button.component"
import { UserContext } from "../../contexts/user.context"
const SignUpForm=()=>{
    const defaultFormFields={
        displayName:"",
        email:"",
        password:"",
        confirmPassword: ""
    }
    const [formFields,setFormFields]=useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields
    const {setCurrentUser} = useContext(UserContext)
    const onChangeHandler=(event)=>{
         const {name,value}=event.target
         setFormFields({...formFields,[name]:value})
         console.log(formFields)
    }  
    const resetForms=()=>{
         setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event)=>{
         event.preventDefault()
         if(password!==confirmPassword) {
            alert("password does not match")
            return
         }
         try{
            const {user} = await createUserAuthWithEmailAndPassword(email,password)
            setCurrentUser(user)
            await createUserDocumentFromAuth(user,{displayName})
            resetForms()
         }
         catch(error){
            if(error.code==="auth/email-already-in-use"){
                alert("email already in use, cannot create user")
            }
            console.log("an error occured",error)
         }
    }

    return(
       <div className ="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up with Email and Password</span>
        <form onSubmit={handleSubmit}>
         <FormInput label ="Display Name" type ="text" required onChange={onChangeHandler} name="displayName" value={displayName}/>
         <FormInput label ="Email" type ="email" required onChange={onChangeHandler} name="email" value={email}/>
         <FormInput label ="Password" type ="password" required onChange={onChangeHandler} name="password" value={password}/>
         <FormInput label ="Confirm password" type ="password" required onChange={onChangeHandler} name="confirmPassword" value={confirmPassword}/>
         <Button type ="submit">Sign Up</Button>
        </form>
       </div>
    )
}
export default SignUpForm
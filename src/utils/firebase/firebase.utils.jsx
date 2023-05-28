import {initializeApp} from "firebase/app"
import {getAuth,signInWithPopup,GoogleAuthProvider, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { getFirestore,doc,getDoc,setDoc} from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmWr6u4HhfLQ5BzgXn_DlP8KQkPqyOnV4",
    authDomain: "crwn-clothing-db-460db.firebaseapp.com",
    projectId: "crwn-clothing-db-460db",
    storageBucket: "crwn-clothing-db-460db.appspot.com",
    messagingSenderId: "1012114420151",
    appId: "1:1012114420151:web:06cecc307086f37f89b832"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider=new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: "select_account",
  })
 
  export const auth=getAuth()

  export const signInWithGooglePopup=()=>signInWithPopup(auth,googleProvider)

  export const db = getFirestore()
  export const createUserDocumentFromAuth=async(userAuth,additionalFields={})=>{
      const userDocRef= doc(db,"users",userAuth.uid)
      console.log(userDocRef)
      const userSnapShot = await getDoc(userDocRef)
      if(!userSnapShot.exists()){
        const {displayName, email}=userAuth
        const createdAt = new Date()
        try{
            await setDoc(userDocRef,{
               displayName,
               email,
               createdAt,
               ...additionalFields
            })
        }
        catch(error){
            console.log(error)
        }
      }
      return userDocRef
  }
  export const createUserAuthWithEmailAndPassword = async(email,password)=>{
      if(!email || !password) return
      return await createUserWithEmailAndPassword(auth,email,password)

  }
  export const SignInUserWithEmailAndPassword = async(email,password)=>{
    if(!email || !password) return
    return await signInWithEmailAndPassword(auth,email,password)

} 
  
export const signOutUser = async ()=>{
   await signOut(auth)
}

      
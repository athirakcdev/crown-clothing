import {initializeApp} from "firebase/app"
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import { getFirestore,doc,getDoc,setDoc} from "firebase/firestore"
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

  const provider=new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: "select_account",
  })
  export const auth=getAuth()

  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)

  export const db = getFirestore()
  export const createUserDocumentFromAuth=async(userAuth)=>{
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
               createdAt
            })
        }
        catch(error){
            console.log(error)
        }
      }
      return userDocRef
  }

      
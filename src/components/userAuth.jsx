import {useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserAuth({auth}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  //for routing
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const switchForm = ()=>{
    if(isSignup){
      setIsSignup(false);
    }
    else{
      setIsSignup(true);
    }
  }

  const handleSignUp = async (e) =>{
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // set display name in firebase Auth
      const displayName = `${firstname} ${lastname}`;
      await updateProfile(result.user, {displayName});

      // save user ingfo in firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        firstname,
        lastname,
        displayName,
        createdAt: Date.now(),
      });

      alert("user registered!");
      navigate("/home");
    } catch (error) {
      console.log("failed to register user",error.message)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User signed in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div className="userAuth">
      {isSignup ? (
      <div className="signUp">
      <h1>Welcome to Blogger</h1>
      <h2>Sign In</h2>

      <input type="text" placeholder="First name" value={firstname} onChange={(e)=> setFirstname(e.target.value)} />

      <input type="text" placeholder="Last Name" value={lastname} onChange={(e)=> setLastname(e.target.value)} />

      <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />

      <input type="text" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />

      <button onClick={handleSignUp}>Sign Up</button>
      <p>already have an account <b onClick={switchForm}>Sign In</b></p>
      </div>):(
      <div className="signIn">
      <h1>Welcome back</h1>
      <h2>Sign In</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      <input type="text" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <p>Don't have an account? <b onClick={switchForm}>Sign Up</b></p>
      </div>)}

    </div>
  
  )
}
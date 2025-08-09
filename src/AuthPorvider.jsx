
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from './Firebase.config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export const AuthContext = createContext(null);







export default function AuthProvider({ children }) {


    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [CartData, setCartData] = useState([])
    const [reg, setReg] = useState("")

    const [allComment, setAllComments] = useState([])
    const [allFirst, setAllFirst] = useState([])
    const [allSecond, setAllSecond] = useState([])

    const navigate = useNavigate();


    //   useEffect(()=>{
    //    fetch(`https://bit-expresso-server.onrender.com/AllComment`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setAllComments(data)

    //             })


    //   },
    //   [])

    //   useEffect(()=>{
    //    fetch(`https://bit-expresso-server.onrender.com/AllFirst`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setAllFirst(data)

    //             })


    //   },
    //   [])

    //     useEffect(()=>{
    //    fetch(`https://bit-expresso-server.onrender.com/AllSecond`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setAllSecond(data)

    //             })


    //   },
    //   [])


    const capitalize = (text) =>
        text.charAt(0).toUpperCase() + text.slice(1);


    //Email Registraton
    const crateEmailUser = async (email, password) => {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ✅ Send verification email
            await sendEmailVerification(user);
            toast.success('Signup successfullY, Verification email sent.', {
                icon: '📧',
            });
            navigate("/")


        } catch (error) {
            const errorCode = error.code; // e.g., "auth/email-already-in-use"
            const readable = errorCode.replace("auth/", "").replace(/-/g, " "); // → "email already in use"
            toast.error(readable);
        }

    }


    //Email login

    const login = async (email, password) => {
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                toast.error("Please verify your email first.");
                return;
            }

            toast.success("Login successful!");
            navigate("/")
        } catch (error) {
            // Extract and format error code
            const errorCode = error.code; // e.g., auth/user-not-found
            const readable = capitalize(errorCode.replace("auth/", "").replace(/-/g, " "));
            toast.error(readable);
        }
    }

    //Log Out

    const logout = () => {
        return signOut(auth)
    }



    //Observer
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)

        });
    }, [])

    const update = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    }







    const authInformation = {
        data,
        crateEmailUser,
        login,
        user,
        logout,
        update,
        allComment,
        allFirst,
        allSecond,
        loading,
        reg

    }





    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    )
}

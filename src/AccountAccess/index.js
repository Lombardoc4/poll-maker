import { Button, Tab, Tabs } from "react-bootstrap"
import { Auth } from 'aws-amplify';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        return user;
    } catch (error) {
        console.log('error signing in', error);
    }
}


async function signUp(username, password, name) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                name,
            }
        });
        console.log(user);
        return user;
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function confirmSignUp(username, code) {
    
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

// TODO :Sign Up Confirmation

const SignUp = ({error, confirm}) => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const passwordRef = useRef(null)
    const nameRef = useRef(null)
    const confirmationRef = useRef(null)
    
    const submit = async (e) => {
        e.preventDefault();
        
        if (submitted) {
            const confirmation = confirmSignUp(email, confirmationRef.current.value)
            if (confirmation) {
                console.log('confirmation', confirmation);
                
                confirm();
            }
            return;
        }
        
        signUp(email, passwordRef.current.value, nameRef.current.value)
        setSubmitted(true);
    }
    
    const header = submitted ? 'Enter the confirmation code sent to your email' : 'Create Account'
    
    return (

            <div className="border border-primary p-4 rounded shadow-sm">
                <h1 className="h3">{header}</h1>
                <form onSubmit={submit} className="d-flex flex-column">
                    {submitted && <>
                        <label className="fs-5" htmlFor="confirmation">Confirmation Code</label>
                        <input
                        ref={confirmationRef}
                        name="confirmation"
                        required
                        className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0"
                        type='text'
                        />
                        <p className="mb-1 text-danger">{error ? error.code : '\xa0'}</p>
                        <Button type="submit" className="mb-3">Login</Button>
                        
                    </>}
                    {!submitted && <>
                        <label className="fs-5" htmlFor="user">Email</label>
                        <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="user"
                        required
                        className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0"
                        type='email'
                        />
                        <p className="mb-1 text-danger">{error ? error.user : '\xa0'}</p>
                        
                        <label className="fs-5" htmlFor="password">Password</label>
                        <p className="mb-1 text-muted">Uppercase, Lowercase, & Number</p>
                        
                        <input 
                        ref={passwordRef}
                        name="password"
                        required
                        className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0"
                        type="password"/>
                        <p className="mb-1 text-danger">{error ? error.password : '\xa0'}</p>
                        
                        <label className="fs-5" htmlFor="name">Display Name</label>
                        <p className="mb-1 text-muted">This is used when you share your polls</p>
                        <input 
                        ref={nameRef}
                        name="name"
                        required
                        className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0"
                        type="text"/>
                        <p className="mb-1 text-danger">{error ? error.name : '\xa0'}</p>
                        <Button type="submit" className="mb-3">Create Account</Button>
                    </>}
                </form>
                <p className="text-center fs-7 mb-0">Crickey Cris Creation</p>
            </div>

    )
}

const Login = ({error}) => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    
    const navigator = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault();
        const confirmation = await signIn(emailRef.current.value, passwordRef.current.value);
        console.log('confirmation', confirmation);
        if (confirmation){
            navigator('/dashboard')
        }
    }
    
    return (

            <div className="border border-primary p-4 rounded shadow-sm">
                <h1 className="h3">Sign into your account</h1>
                <form onSubmit={submit} className="d-flex flex-column">
                    
                    <label className="fs-5" htmlFor="user">Email</label>
                    <input
                    ref={emailRef}
                    name="user"
                    required
                    className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0"
                    type='email'
                    />
                    <p className="mb-1 text-danger">{error ? error.user : '\xa0'}</p>
                    <label className="fs-5" htmlFor="password">Password</label>
                    <p className="mb-1 text-muted">Uppercase, Lowercase, & Number</p>
                    <input 
                    ref={passwordRef}
                    name="password"
                    required
                    className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0"
                    type="password"/>
                    <p className="mb-1 text-danger">{error ? error.password : '\xa0'}</p>
                    <Button type="submit" className="mb-3">Login</Button>
                </form>
                <p className="text-center fs-7 mb-0">Crickey Cris Creation</p>
            </div>

    )
}


const AccountAccess = () => {
    const [key, setKey] = useState('login');

    return(
    <div 
    className="d-flex align-items-center justify-content-center bg-white-50"
    style={{height: window.innerHeight}}>
        <div className="w-33 d-flex flex-column">
            {/* <img className="w-50 mx-auto mb-3" src="https://crislombardo.com/img/alligator.png" alt="logo"/> */}
        <Tabs
        transition={false}
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="noanim-tab-example"
        >
            <Tab eventKey="login" title="Login">
                <Login/>
            </Tab>
            <Tab eventKey="create" title="Create Account">
                <SignUp confirm={() => setKey('login')}/>
            </Tab>
        </Tabs>
        </div>
    </div>
)}

export default AccountAccess
import { useState } from "react";
import axios from "axios";

const projectID = '0a2ff696-0e50-464b-aff9-937cdf7c79cc';
const LoginForm = () => {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    const handlesubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            'Project-ID': projectID, 'User-Name': username,
            'User-Secret': password
        };

        try {
            // use await for async functions
            // username, password => chatengine -> give msgs
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            //    worksout ->logged in
            // store username and pswd to local storage so not to login again and again
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            // reload th page
            window.location.reload();
            seterror('');

        } catch (err) {

            // error ->try with new username
            seterror('Oops, incorrect credentials.')
        }


    }


    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handlesubmit}>
                    <input type="text" value={username} onChange={(e) => setusername(e.target.value)}
                        className="input"
                        placeholder="Username" required />

                    <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}
                        className="input"
                        placeholder="Password" required />

                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                </form>
                <h2>{error}</h2>

            </div>
        </div>
    );
}

export default LoginForm;
// import logo from './logo.svg';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = '0a2ff696-0e50-464b-aff9-937cdf7c79cc';
const App = () => {
  // if not logged in,show the login form
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height='100vh'
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      projectID={projectID}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />

  );
}

export default App;

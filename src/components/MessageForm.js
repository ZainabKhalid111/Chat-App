import React from 'react'
import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';

const MessageForm = (props) => {

  const [value, setvalue] = useState('');
  const [chatId, creds] = props;

  const handlesubmit = (event) => {
    // prevents refreshing the browser when form submits
    event.preventDefault();
    // trim text of the message
    const text = value.trim();

    if (text.length > 0) sendMessage(creds, chatId, { text });
    // after sending the msg, reset the message area/value
    setvalue('');

  };

  const handlechange = (event) => {
    // value of input is stored in
    setvalue(event.target.value);
    isTyping(props, chatId);
  };

  // event is the image
  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className='message-form' onSubmit={handlesubmit}>

      <input className='message-input '
        placeholder='Send a message ...'
        value={value}
        onChange={handlechange}
        onSubmit={handlesubmit} />

      {/* adding image field */}
      <label htmlFor='upload-button'>
        <span className='image-button'>
          <PictureOutlined className='picture-icon' />
        </span>
      </label>
      {/* adding picture input field */}
      <input type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}

      />

      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />

      </button>

    </form>
  );
}


export default MessageForm;
import "./ComposeEmail.css";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { toast } from "react-toastify";
const ComposeEmail = () => {
  const [editorState, setEditorState] = useState("");

  const notify = (message) => toast(message);

  const [formData, setFormData] = useState({
    to: "",
    content: "",
    subject: "",
  });
  const handler = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const plainText = contentState.getPlainText();
    setFormData({ ...formData, content: plainText });
  };
  const emailHandler = (e) => {
    setFormData({ ...formData, to: e.target.value });
  };

  const subjectHandler = (e) => {
    setFormData({ ...formData, subject: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/email/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const fecthedResponse = response.json();

    notify(fecthedResponse.message);
  };
  return (
    <>
      <h1 className="compose-h1">Compose Email</h1>
      <form className="form-compose" onSubmit={onSubmitHandler}>
        <input
          onChange={emailHandler}
          className="form-compose-input"
          type="email"
          placeholder="To :"
        />
        <input
          className="form-compose-input"
          type="text"
          placeholder="Sunject : "
          onChange={subjectHandler}
        />
        <div className="editor">
          <Editor editorState={editorState} onEditorStateChange={handler} />
        </div>
        <button className="compose-button">Send</button>
      </form>
    </>
  );
};

export default ComposeEmail;

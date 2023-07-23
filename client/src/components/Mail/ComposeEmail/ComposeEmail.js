import "./ComposeEmail.css";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HamBurger from "../HamBurger/HamBurger";
import { useDispatch } from "react-redux";
import { mailActions } from "../../store/redux-store";
const ComposeEmail = () => {
  const [editorState, setEditorState] = useState("");

  const dispatch = useDispatch();

  const [isForm, setIsForm] = useState(false);

  const notify = (message) => toast(message);

  const [formData, setFormData] = useState({
    to: "",
    content: "",
    subject: "",
  });

  useEffect(() => {
    if (formData.to.includes("@kitty.com") && formData.content.length > 10) {
      setIsForm(true);
    } else {
      setIsForm(false);
    }
  }, [formData]);

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
      body: JSON.stringify(formData),
    });

    const fecthedResponse = await response.json();

    notify(fecthedResponse.message);
    dispatch(mailActions.addEmail(formData));
    setFormData({ to: "", subject: "", content: "" });
  };
  return (
    <>
      <header className="header">
        <HamBurger />
        <h1>Compose Email</h1>
        <button
          onClick={onSubmitHandler}
          className="compose-button"
          disabled={!isForm}
        >
          Send
        </button>
      </header>
      <form className="form-compose">
        <input
          onChange={emailHandler}
          className="form-compose-input"
          type="email"
          placeholder="To :  *example@kitty.com"
          value={formData.to}
          required
        />
        <input
          className="form-compose-input"
          type="text"
          placeholder="Subject : "
          onChange={subjectHandler}
          value={formData.subject}
          required
        />
        <p className="must">*Must contain atleast 20 characters</p>
        <div className="editor">
          <Editor
            editorState={editorState}
            onEditorStateChange={handler}
            value={formData.content}
            required
          />
        </div>
      </form>
    </>
  );
};

export default ComposeEmail;

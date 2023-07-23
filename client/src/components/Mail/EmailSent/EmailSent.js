import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamBurger from "../HamBurger/HamBurger";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/redux-store";

import "./EmailSent.css";
import { toast } from "react-toastify";

const EmailSent = () => {
  const mails = useSelector((state) => state.mail.mails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = message => toast(message)

  useEffect(() => {
    fetchData();
  }, []);

  const viewContentHandler = (id) => {
    navigate(`/view-email/${id}`);
  };

  const fetchData = async () => {
    try {
      console.log(localStorage.getItem("token"));
      const response = await fetch("http://localhost:5000/email/get-emails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      dispatch(mailActions.fetchAdd(data.mails));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    const response = await fetch(
      `http://localhost:5000/email/delete-email-from/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const fetchedData = await response.json();
    notify(fetchedData.message);
    await fetchData();
  };
  return (
    <div>
      <div className="email-h1">
        <header>
          <h1>Email sent</h1>
          <HamBurger />
        </header>
      </div>
      <table>
        <tbody>
          {mails.map((mail) => (
            <tr key={mail.id}>
              {!mail.fromTrue && (
                <td className="email-subject-container">
                  <Link
                    onClick={() => {
                      viewContentHandler(mail.id);
                    }}
                  >
                    {mail.subject}
                  </Link>
                  <button
                    onClick={() => deleteHandler(mail.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailSent;

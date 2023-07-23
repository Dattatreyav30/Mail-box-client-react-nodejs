import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamBurger from "../HamBurger/HamBurger";
import { useDispatch, useSelector } from "react-redux";
import { recievedMailActions } from "../../store/redux-store";

import "./EmailRecieved.css";
import { toast } from "react-toastify";

const EmailRecieved = () => {
  const mails = useSelector((state) => state.mailRecieve.mailRecieve);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(mails);

  const viewContentHandler = async (id) => {
    navigate(`/view-inbox-email/${id}`);
    const response = await fetch("http://localhost:5000/email/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      console.log("succesfull");
    }
  };

  const fetchData = async () => {
    try {
      console.log(localStorage.getItem("token"));
      const response = await fetch(
        "http://localhost:5000/email/get-recieved-emails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      dispatch(recievedMailActions.fetchAddEmail(data.mails));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    const response = await fetch(
      `http://localhost:5000/email/delete-email/${id}`,
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
          <h1>Email recieved</h1>
          <HamBurger />
        </header>
      </div>
      <table>
        <tbody>
          {mails.map((mail) => (
            <tr key={mail.id}>
              <div>
                {!mail.toTrue && (
                  <td className="email-subject-container ">
                    <Link
                      onClick={() => {
                        viewContentHandler(mail.id);
                      }}
                    >
                      {mail.subject}
                    </Link>
                    {!mail.isRead && (
                      <h1
                        style={{
                          fontSize: "6rem",
                          color: "green",
                          marginTop: "-3.5rem",
                        }}
                      >
                        .
                      </h1>
                    )}
                    <button
                      onClick={() => deleteHandler(mail.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailRecieved;

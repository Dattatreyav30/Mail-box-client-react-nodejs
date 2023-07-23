import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HamBurger from "../HamBurger/HamBurger";
import "./ViewEmail.css";

const ViewEmail = () => {
  const params = useParams();
  const mails = useSelector((state) => state.mail.mails);

  const [mail, setMail] = useState(null);

  useEffect(() => {
    const findEmail = async () => {
      const foundMail = await mails.find((mail) => mail.id == params.id);
      setMail(foundMail);
    };

    findEmail();
  }, [mails, params.id]);

  return (
    <>
      <div className="email-h1">
        <h1>View Email</h1>
        <HamBurger />
      </div>
      <div className="email-container">
        {mail ? (
          <>
            <p className="email-subject">{mail.subject}</p>
            <p className="email-content">{mail.content}</p>
          </>
        ) : (
          <p className="email-loading">Loading email...</p>
        )}
      </div>
    </>
  );
};

export default ViewEmail;

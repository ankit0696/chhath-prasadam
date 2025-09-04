"use client";

import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      // Correctly set test flag on the auth settings, BEFORE RecaptchaVerifier initialization
      auth.settings.appVerificationDisabledForTesting = true;

      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified");
          }
        },
        auth
      );
    }
  }, []);

  const requestOTP = () => {
    if (!phone) {
      alert("Please enter your phone number!");
      return;
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmation(confirmationResult);
        alert("OTP sent to " + phone);
      })
      .catch((error) => {
        console.error("SMS not sent", error);
        alert("Failed to send OTP. Check console for details.");
      });
  };

  const verifyOTP = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    confirmation
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        alert("Login successful! UID: " + user.uid);
        // Redirect to home page or store user in global state
      })
      .catch((error) => {
        console.error("Invalid OTP", error);
        alert("Invalid OTP, please try again.");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login with Phone</h1>

      {!confirmation && (
        <>
          <input
            type="tel"
            placeholder="+911234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={requestOTP}
            style={{ padding: "10px 20px", width: "100%" }}
          >
            Send OTP
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>

      {confirmation && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "10px", width: "100%", marginTop: "10px" }}
          />
          <button
            onClick={verifyOTP}
            style={{ padding: "10px 20px", width: "100%", marginTop: "10px" }}
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}

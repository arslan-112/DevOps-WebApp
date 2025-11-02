import { useState, useContext } from "react";
import "./Css/Login.css";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignUp } from "../Api/UserAuth";
import { UserAuthContext } from "../Context/UserAuth";

export const LoginPage = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (state === "Login") {
      try {
        setLoading(true);
        const response = await userLogin({ username: email, password });
        const { token, user } = response;
        login(token, user);
        navigate("/home", { replace: true });
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await userSignUp({ firstName, lastName, username: email, password });
        setState("Login");
      } catch (error) {
        console.error("Sign-Up failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="LoginSignup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleContinue} disabled={loading}>
          {loading ? "Loading..." : "Continue"}
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState("Login")}>Login</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account? <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}
      </div>
    </div>
  );
};

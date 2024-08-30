import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export default function Login() {

  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  function handleinputchange(e) {
    const { value, id } = e.target;

    if (e) {
      const formDataCopy = {
        ...formData,
      };
      formDataCopy[id] = value;
      setFormData(formDataCopy);
    }
    if (id === "email") {
      if (!validateEmail(value)) {
        setFormErrors({
          ...formErrors,
          email: "Email is not valid",
        });
      } else {
        setFormErrors({
          ...formErrors,
          email: "",
        });
      }
    } else if (id === "password") {
      if (value.length < 6 || value.length > 16) {
        setFormErrors({
          ...formErrors,
          password: "Password must be 6 to 16 Digits only",
        });
      } else {
        setFormErrors({
          ...formErrors,
          password: null,
        });
      }
    }
  }
  function handleLogin() {
    if (!formData.email || !formData.password) {
      console.error("Invalid credentials");
    } else {
      fetch("http://localhost:5000/users/login", {
        method: "post",
        headers: {
          "content-type":"application/json",
        },
        body:JSON.stringify(formData),
      }

      ).then((response) => response.json()).then((result) => {
        if (result && result)
          navigator("/finanse");
      }).catch((error) => {
        console.error(error)
      });
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="inputcontainer">
            <label htmlFor="email" className="inputcontainer">
              E-mail
            </label>
            <input
              onChange={handleinputchange}
              id="email"
              placeholder="Enter Your Email"
            />
            {formErrors["email"] && (
              <p className="error">{formErrors["email"]}</p>
            )}
          </div>
          <div className="inputcontainer">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleinputchange}
              id="password"
              type="text"
              placeholder="Enter Your Password"
            />
            {formErrors["password"] && (
              <p className="error">{formErrors["password"]}</p>
            )}
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" size="md" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

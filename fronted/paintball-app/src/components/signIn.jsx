import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useAuth } from "../context/auth.context";

const SignIn = () => {
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const { logIn, user } = useAuth();

  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { email: "", password: "" },
    validate(values) {
      const errors = {};
      if (values.email === "") {
        errors.email = "email cant be empty";
      } else if (!values.email.endsWith(".com") && values.email.length > 4) {
        errors.email = `"email must end with ".com"`;
      } else if (values.email.length < 3) {
        errors.email = "email cant less then 2 chars";
      }
      if (values.password === "") {
        errors.password = "dani";
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await logIn(values);
        console.log(user); // user shown after refresh, supposed to be render, don't know why not

        navigate("/about");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title={<h1>Sign in page</h1>} />
      <p>sign in to enter</p>
      <form
        style={{ maxWidth: "800px", margin: "auto" }}
        onSubmit={form.handleSubmit}
      >
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          {...form.getFieldProps("email")}
          error={form.errors.email}
          name="email"
          type="email"
          id="email"
        />
        <Input
          {...form.getFieldProps("password")}
          name="password"
          type="password"
          id="password"
        />
        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </>
  );
};
export default SignIn;

/* eslint-disable import/no-unresolved */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { registerUser } from "../../../services/blogService";
import { setErrors } from "../../../store/slices/user-slice";
import { setSubmit } from "../../../store/slices/status-slice";

import styles from "./SignUp.module.scss";

function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const servErr = useSelector((state) => state.user.errors);
  const { user } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(setSubmit(false));
    dispatch(registerUser(data));
  };

  const navigate = useNavigate();
  const home = useSelector((state) => state.status.home);
  useEffect(() => {
    dispatch(setErrors(null));
    if (home) navigate("/");
  }, [home, dispatch, navigate]);

  const { submitActive } = useSelector((state) => state.status);
  const submit = submitActive
    ? styles.submit
    : classNames(styles.submit, styles.disabledBtn);

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Create new account</h1>

        <ul className={styles.inputsList}>
          <li className={styles.inputsItem}>
            <label htmlFor="name" className={styles.label}>
              Username{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              placeholder="Username"
              autoFocus
              style={errors.username && { outline: "1px solid #F5222D" }}
              {...register("username", {
                required: "Обязательное поле.",
                minLength: {
                  value: 3,
                  message: "Имя пользователя должно быть не менее 3 символов.",
                },
                maxLength: {
                  value: 20,
                  message: "Имя пользователя должно быть не более 20 символов.",
                },
              })}
            />
            {servErr?.username && (
              <p className={styles.error}>
                {user.username} {servErr?.username}
              </p>
            )}
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </li>

          <li className={styles.inputsItem}>
            <label htmlFor="email" className={styles.label}>
              Email address{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              id="email"
              placeholder="Email address"
              onKeyUp={() => {
                setValue("email", watch("email").toLowerCase());
              }}
              style={errors.email && { outline: "1px solid #F5222D" }}
              {...register("email", {
                required: "Обязательное поле",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Некорректный email",
                },
              })}
            />
            {servErr?.email && (
              <p className={styles.error}>
                {user.email} {servErr?.email}
              </p>
            )}
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </li>

          <li className={styles.inputsItem}>
            <label htmlFor="password" className={styles.label}>
              Password{" "}
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              style={errors.password && { outline: "1px solid #F5222D" }}
              {...register("password", {
                required: "Обязательное поле.",
                minLength: {
                  value: 6,
                  message: "Ваш пароль должен быть не менее 6 символов.",
                },
                maxLength: {
                  value: 40,
                  message: "Ваш пароль должен быть не длиннее 40 символов.",
                },
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </li>

          <li className={styles.inputsItem}>
            <label htmlFor="repeatPassword" className={styles.label}>
              Repeat Password{" "}
            </label>
            <input
              className={styles.input}
              type="password"
              id="repeatPassword"
              placeholder="Password"
              style={errors.repeatPassword && { outline: "1px solid #F5222D" }}
              {...register("repeatPassword", {
                required: "Обязательное поле.",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Пароли должны совпадать.";
                },
              })}
            />
            {errors.repeatPassword && (
              <p className={styles.error}>{errors.repeatPassword.message}</p>
            )}
          </li>
        </ul>
        <div className={styles.agreement}>
          <label htmlFor="agreement" className={styles.checkLabel}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="agreement"
              name="agreement"
              style={errors.agreement && { outline: "1px solid #F5222D" }}
              {...register("agreement", {
                required: "Необходимо подтвердить пользовательское соглашение",
              })}
            />
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.agreement && (
          <p className={styles.error}>{errors.agreement.message}</p>
        )}

        <button type="submit" className={submit} disabled={!submitActive}>
          Create
        </button>

        <span className={styles.signInLabel}>
          Already have an account?{" "}
          <Link className={styles.signIn} to="/sign-in">
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignUp;

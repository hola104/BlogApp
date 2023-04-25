/* eslint-disable import/no-unresolved */
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { updateUser } from "../../../services/blogService";
import signUp from "../SignUp/SignUp.module.scss";
import { setSubmit } from "../../../store/slices/status-slice";

import styles from "./Profile.module.scss";

function Profile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const servErr = useSelector((state) => state.user.errors);

  const onSubmit = (data) => {
    dispatch(setSubmit(false));
    dispatch(updateUser(data));
  };

  const { submitActive } = useSelector((state) => state.status);
  const submit = submitActive
    ? styles.submit
    : classNames(styles.submit, styles.disabledBtn);

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Edit Profile</h1>

        <ul className={styles.inputsList}>
          <li>
            <label htmlFor="name" className={styles.label}>
              Username
              <input
                className={styles.input}
                type="text"
                id="name"
                placeholder="Username"
                defaultValue={user.username}
                autoFocus
                style={errors.username && { outline: "1px solid #F5222D" }}
                {...register("username", {
                  required: "Обязательное поле.",
                  minLength: {
                    value: 3,
                    message:
                      "Имя пользователя должно быть не менее 3 символов.",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "Имя пользователя должно быть не более 20 символов.",
                  },
                })}
              />
            </label>
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
            {servErr?.username && (
              <p className={signUp.error}>
                {user.username} {servErr?.username}
              </p>
            )}
          </li>

          <li>
            <label htmlFor="email" className={styles.label}>
              Email address
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="Email address"
                defaultValue={user.email}
                style={errors.email && { outline: "1px solid #F5222D" }}
                {...register("email", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Некорректный email",
                  },
                })}
              />
            </label>
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
            {servErr?.email && (
              <p className={signUp.error}>
                {user.email} {servErr?.email}
              </p>
            )}
          </li>

          <li>
            <label htmlFor="password" className={styles.label}>
              New password
              <input
                className={styles.input}
                type="password"
                id="password"
                placeholder="New password"
                style={errors.password && { outline: "1px solid #F5222D" }}
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Your password needs to be at least 6 characters.",
                  },
                  maxLength: {
                    value: 40,
                    message:
                      "Your password needs to be not more than 40 characters.",
                  },
                })}
              />
            </label>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </li>

          <li>
            <label htmlFor="avatar" className={styles.label}>
              Avatar image (url)
              <input
                className={styles.input}
                type="text"
                id="avatar"
                placeholder="Avatar image"
                defaultValue={user.image}
                style={errors.image && { outline: "1px solid #F5222D" }}
                {...register("image", {
                  pattern: {
                    value:
                      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    message: "Your url link is not correct",
                  },
                })}
              />
            </label>
            {errors.image && (
              <p className={styles.error}>{errors.image.message}</p>
            )}
          </li>
        </ul>

        <button type="submit" className={submit} disabled={!submitActive}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;

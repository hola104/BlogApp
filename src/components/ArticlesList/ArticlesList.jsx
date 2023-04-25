/* eslint-disable import/no-unresolved */
import React, { useEffect } from "react";
import { Alert, Pagination, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { fetchArticles } from "../../services/blogService";
import { setLimit, setPage } from "../../store/slices/articles-slice";
import {
  setLocation,
  setStatus,
  goHome,
} from "../../store/slices/status-slice";
import { SingleArticle } from "../Article/SingleArticle";

import styles from "./ArticlesList.module.scss";

function ArticlesList() {
  const dispatch = useDispatch();
  const { articles, articlesCount, page, limit } = useSelector(
    (state) => state.articles
  );
  const status = useSelector((state) => state.status.status);
  const { token } = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(goHome(false));
    dispatch(setLocation("articles-list"));
    dispatch(setStatus("loading"));
    dispatch(fetchArticles(page, limit, token));
  }, [page, limit, dispatch, token]);

  const articlez = articles.map((article) => (
    <li key={article.slug}>
      <SingleArticle article={article} />
    </li>
  ));

  const showContent = (stat) => {
    switch (stat) {
      case "loading":
        return <Spin tip="Загрузка..." size="large" />;
      case "404":
        return (
          <Alert
            message="По Вашему запросу ничего не найдено"
            description="Попробуйте изменить запрос"
            type="warning"
            showIcon
          />
        );
      case "error":
        return (
          <Alert
            message="Ошибка сервера"
            description="Попробуйте перезагрузить страницу"
            type="error"
            showIcon
          />
        );
      case "offline":
        return (
          <Alert
            className={styles.error}
            message="У вас нет интернет соединения!"
            description="Пожалуйста проверьте ваш кабель"
            type="error"
            showIcon
          />
        );
      default:
        return articlez;
    }
  };

  const content = showContent(status);

  // eslint-disable-next-line no-shadow
  const onPaginationChange = (page, limit) => {
    dispatch(setPage(page));
    dispatch(setLimit(limit));
  };

  return (
    <div className={styles.main}>
      <ul className={styles.list}>{content}</ul>
      {status !== "error" && (
        <Pagination
          className={styles.pag}
          hideOnSinglePage
          current={page}
          pageSize={limit}
          pageSizeOptions={[5, 10, 20, 40, 100, 500]}
          total={articlesCount}
          /* eslint-disable-next-line no-shadow */
          onChange={(page, pageSize) => onPaginationChange(page, pageSize)}
        />
      )}
    </div>
  );
}

export default ArticlesList;

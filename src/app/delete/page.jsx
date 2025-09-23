"use client";

import axios from "axios";
import { useState } from "react";
import styles from "./delete.module.css";

export default function Delete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [comment, setComments] = useState(false);
  const [commentId, setCommentId] = useState("");

  const buscarComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${commentId}`
      );
      setComments(response.data);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar comentário:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletarComentario = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${commentId}`
      );
      setSuccess(true);
      setComments(null);
      setCommentId("");
    } catch (error) {
      setError(true);
      console.error("Erro ao deletar comentário", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deletar Comentário</h1>

      <div className={styles.formGroup}>
        <input
          className={styles.input}
          type="text"
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
          placeholder="Id do comentário"
          required
        />
        <button
          className={styles.button}
          onClick={buscarComments}
          disabled={loading || !commentId}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {comment && (
        <div className={styles.commentBox}>
          <h2 className={styles.commentTitle}>
            Comentário Encontrado: {comment.id}
          </h2>
          <p className={styles.commentText}>Nome: {comment.name}</p>
          <p className={styles.commentText}>Email: {comment.email}</p>
          <p className={styles.commentText}>Corpo: {comment.body}</p>

          <button
            className={styles.button}
            onClick={deletarComentario}
            disabled={loading}
          >
            {loading ? "Deletando..." : "Deletar Comentário"}
          </button>
        </div>
      )}

      {error && (
        <p className={styles.errorMsg}>
          Ocorreu um erro ao deletear o comentário. Tente novamente.
        </p>
      )}
      {success && (
        <p className={styles.successMsg}>Comentário deletado com sucesso!</p>
      )}
    </div>
  );
}

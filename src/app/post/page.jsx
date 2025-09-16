"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Post() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });
    const [error, setError] = useState(false);

    const createComment = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/comments",
                {
                        name: form.name.trim(),
                        email: form.email.trim(),
                        body: form.body.trim(),
                }
            );
            setAddedComment([response.data, ...addedComment]);
            setForm({
                name: "",
                email: "",
                body: "",
            });
            setError(false);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const updateForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Adicionar Comentário</h1>
            <div className={styles.form}>
                <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={form.name}
                        onChange={updateForm}
                        required
                />
                <input
                        className={styles.input}
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={updateForm}
                />
                <textarea
                        className={styles.textarea}
                        name="body"
                        placeholder="Comentário"
                        value={form.body}
                        onChange={updateForm}
                        required
                />

                <button 
                        className={styles.button} 
                        onClick={createComment} 
                        disabled={!form.name.trim()|| loading}
                >
                        {loading ? "Adicionando..." : "Adicionar Comentário"}
                </button>
                {error && <p className={styles.error}>Ocorreu um erro ao adicionar o comentário.</p>}
            </div>

            <h2 className={styles.subtitle}>Comentários adicionados</h2>

            <ul className={styles.commentsList}>
                    {addedComment.map((comment) => (
                            <li key={comment.id} className={styles.commentItem}>
                                    <p className={styles.commentId}>ID: {comment.id}</p>
                                    <p className={styles.commentName}>{comment.name}</p>
                                    <p className={styles.commentEmail}>{comment.email}</p>
                                    <p className={styles.commentBody}>{comment.body}</p>
                            </li>
                    ))}
            </ul>
        </div>
    );
}
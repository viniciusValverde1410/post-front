"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./put.module.css";

export default function Put() {
    const [commentId, setCommentId] = useState("");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sucess, setSuccess] = useState(null);

    const buscarComentario = async () => {
        try {
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setForm({ name: data.name, email: data.email, body: data.body });
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const editarComentario = async () => {
        try {
            setLoading(true);
            await axios.put(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`,
                form
            );
            setSuccess("Comentário editado com sucesso!");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editar Comentário</h1>

            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="number"
                    placeholder="ID do comentário"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={buscarComentario}
                    disabled={loading}
                >
                    {loading ? "Buscando... " : "Buscar comentário"}
                </button>
            </div>

            {form.name && (
                <div className={styles.formGroup}>
                    <h2 className={styles.subtitle}>Editar detalhes do comentário</h2>
                    <input
                        className={styles.input}
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nome"
                    />
                    <br />
                    <input
                        className={styles.input}
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email"
                    />
                    <br />
                    <textarea
                        className={styles.textarea}
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        placeholder="Comentário"
                        rows={3}
                    />
                    <br />
                    <button
                        className={styles.button}
                        onClick={editarComentario}
                        disabled={loading || !form.name?.trim()}
                    >
                        {loading ? "Editando... " : "Editar comentário"}
                    </button>
                </div>
            )}

            {error && <p className={styles.error}>Ocorreu um erro. Tente novamente.</p>}
            {sucess && <p className={styles.success}>{sucess}</p>}
        </div>
    );
}
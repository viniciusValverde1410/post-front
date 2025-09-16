"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import styles from './page.module.css';

export default function GetByIdPage() {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState(false);

    const params = useParams();
    const commentId = params.id;

    const getComment = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setComment(response.data);
        } catch (err) {
            setError(true);
            setComment([]);
        }
        setLoading(false);
    };

    const navegarParaComments = (commentId) => {
        router.push(`/get/${commentId}`);
    };

    useEffect(() => {
        getComment();
    }, [commentId]);

    if (loading) {
        return <p className={styles.loading}>Carregando...</p>;
    }
    if (error) {
        return <p className={styles.error}>Ocorreu um erro ao carregar o comentário.</p>;
    }
    if (!comment) {
        return <p className={styles.notFound}>Comentário não encontrado.</p>;
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comentário # {comment.id}</h1>
            <div className={styles.commentDetails}>
                <p className={styles.field}><strong>Nome:</strong> {comment.name}</p>
                <p className={styles.field}><strong>Email:</strong> {comment.email}</p>
                <p className={styles.field}><strong>Mensagem:</strong> {comment.body}</p>
            </div>
            <hr className={styles.divider} />
            <Link href="/get" className={styles.backLink}>
                Voltar para a lista de comentários
            </Link>
        </div>
    );
}
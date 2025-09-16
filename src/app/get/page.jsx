"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import styles from "./page.module.css"

export default function GetPage() {
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [error, setError] = useState(false)

    const router = useRouter()

    const buscarComments = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments")
            setComments(response.data)
        } catch (error) {
            setError(true)
            console.error("Erro ao buscar comentários:", error)
        } finally {
            setLoading(false)
        }
    };

    const navegarParaComment = (commentId) => {
        router.push(`/get/${commentId}`)
    };

    useEffect(() => {
        buscarComments()
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Lista de comentários</h1>
                <p className={styles.headerSubtitle}>Comentários ({comments.length})</p>
            </div>

            {loading ? (
                <p className={styles.loading}>Carregando comentários...</p>
            ) : error ? (
                <p className={styles.error}>Erro ao carregar comentários. Tente novamente mais tarde.</p>
            ) : (
                <div className={styles.cardsGrid}>
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className={styles.cardItem}
                            onClick={() => navegarParaComment(comment.id)}>
                            <p className={styles.cardId}>ID: {comment.id}</p>
                            <h3 className={styles.cardTitle}>{comment.name}</h3>
                            <p className={styles.cardMeta}>{comment.email}</p>
                            <p className={styles.cardContent}>{comment.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
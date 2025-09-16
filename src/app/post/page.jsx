"use client"

import { useState } from "react"
import axios from "axios"

export default function PostPage() {
    const [loading, setLoading] = useState(false)
    const [addedComment, setAddedComment] = useState(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: ""
    });
    const [error, setError] = useState(null)

    const criarNovoComment = async () => {
        setLoading(true)
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", form)
        } catch (error) {
            setError("Erro ao adicionar comentário. Tente novamente mais tarde.")
            console.error("Erro ao adicionar comentário:", error)
        } finally {
            setLoading(false)
        }
    }

    
}
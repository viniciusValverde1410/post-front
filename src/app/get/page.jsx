"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function GetPage() {
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [error, setError] = useState(false)

    const router = useRouter()

    
}
import {useState, useEffect} from 'react'
import axios from 'axios'

function DogsAPI() {
    const [dogs, setDogs] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [page, setPage] = useState(1) 
    const [result, setResult] = useState(0)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() =>{
        const getDogs = async () => {
            const res = await axios.get(`/api/dogs?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setDogs(res.data.dogs)
            setResult(res.data.result)
        }
        getDogs()
    },[callback, category, sort, search, page])
    
    return {
        dogs: [dogs, setDogs], callback: [callback, setCallback], category: [category, setCategory],
        sort: [sort, setSort], search: [search, setSearch], page: [page, setPage], result: [result, setResult]
    }
}

export default DogsAPI

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import HeadLessTippy from '@tippyjs/react/headless';


import useDebounce from "../../hooks/useDebounce";
import classes from './Search.module.css'
import * as SearchService from "../../services/SearchService";
import { Link } from "react-router-dom";

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [history, setHistory] = useState(() => {
        let searchHistory = localStorage.getItem('search')
        searchHistory = JSON.parse(searchHistory)
        return searchHistory
    })


    const inputRef = useRef()
    
    const debouncedValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if(!debouncedValue.trim()){
            setSearchResult([])
            return  
        } 

        const fetchApi = async () => {
            const result = await SearchService.search(debouncedValue)
            setSearchResult(result)
        }

        fetchApi()

    }, [debouncedValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleClickOutSide = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if(!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }     
    }
    const handleOnClick = (name) => {
        console.log(name)
        let arr = []
        if(localStorage['search']){
            let a = localStorage.getItem('search')
            arr = JSON.parse(a)
            let check = true
            for(let i = 0; i < 3; i++){
                if(arr[i] === name){
                    check = false
                    break
                }
            }
            if(check){
                arr.unshift(name)
                setHistory(arr)
                localStorage.setItem('search', JSON.stringify(arr))
            }
        } else {
            arr.unshift(name)
            setHistory(arr)
            localStorage.setItem('search', JSON.stringify(arr))
        }
    }
  return (
    <div>
        <HeadLessTippy
            className={classes.containter1}
            interactive
            visible={showResult}
            render={attrs => (
                <div  tabIndex="-1" {...attrs} className={classes["search-result"]}>
                        {searchResult ? searchResult.map((result) => (
                            <Link className={classes["search-content"]} key={result.recipeId} to={`/search/${result.recipeName}`}>
                                <button className={classes["btn-search"]}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                <span onClick={() => {
                                    handleOnClick(result.recipeName)
                                    // handleClickOutSide()
                                }}>{result.recipeName}</span>
                            </Link>
                        )) : (
                            <div className={classes["search-content"]}>
                                <button className={classes["btn-search"]}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                <span>Không có công thức phù hợp</span>
                            </div>
                        )}
                        {history && (
                            <div>
                                <h6 className={classes.history}>Lịch sử tìm kiếm</h6>
                                {history.slice(0,3).map((result, index) => (
                                    <Link className={classes["search-content"]} key={index} to={`/search/${result}`}>
                                        <button className={classes["btn-search"]}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                                        <span onClick={() => {
                                            handleOnClick(result)
                                            // handleClickOutSide()
                                        }}>{result}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                </div>
                        
            )}
            onClickOutside = {handleClickOutSide}
        >
            <div className={classes.search}>
                <button className={classes["btn-search"]}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                <input 
                    type="text" 
                    placeholder='Gõ vào tên công thức...'
                    ref={inputRef}
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />

                    <button className={classes.clear} onClick={handleClear}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
            </div>
        </HeadLessTippy>
    </div>
  )
}

export default Search

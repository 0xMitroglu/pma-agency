import React from "react"
import ExportedImage from "next-image-export-optimizer"
import backgroundGradient from "../../public/gradient.png"
import { useState, useEffect } from "react"
import data from "../../celebrities.json"
import logo from "../../public/logoCut.png"
import fullStar from "../../public/fullStarDark.png"
import emptyStar from "../../public/emptyStarDark.png"
import fullStarWhite from "../../public/goldfullStar.png"
import categoriesData from "../../categories.json"
import { faFilter, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Navbar from "@/hooks/Navbar"
import { useRouter } from "next/router"
import Head from "next/head"
import Footer from "@/hooks/Footer"
const Celebrities = () => {
    const router = useRouter()
    const [slider1, setSlider1] = useState("")
    const [slider2, setSlider2] = useState("")
    const [review, setReview] = useState("")
    const [categories, setCategories] = useState([])
    const [rating, setRating] = useState(0)
    const [allCelebrities, setAllCelebrities] = useState([])
    const foundCelebrities = allCelebrities.map((el) => {
        const cel = el.array.map((data) => {
            const rating = parseInt(data.rating)
            return (
                <div
                    className="celebrities__page__celebrity"
                    key={data.imageFront}
                    onClick={() => {
                        router.push({
                            pathname: `celebrities/${data.name}`,
                        })
                    }}
                >
                    <img src={data.imageFront}></img>
                    <div className="celebrities__page__celebrity__info">
                        {" "}
                        <div className="celebrities__page__celebrity__stars">
                            {rating == 1 || rating == 0 ? (
                                <ExportedImage
                                    src={fullStarWhite}
                                    alt="Orginal, unoptimized image"
                                    unoptimized={true}
                                />
                            ) : rating == 2 ? (
                                <>
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                </>
                            ) : rating == 3 ? (
                                <>
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                </>
                            ) : rating == 4 ? (
                                <>
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />{" "}
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />{" "}
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                </>
                            ) : rating == 5 ? (
                                <>
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                    <ExportedImage
                                        src={fullStarWhite}
                                        alt="Orginal, unoptimized image"
                                        unoptimized={true}
                                    />
                                </>
                            ) : (
                                ""
                            )}{" "}
                        </div>
                        <div className="celebrities__page__celebrity__price">
                            <div className="celebrities__page__celebrity__price__box">
                                ${data.price}
                            </div>
                        </div>
                    </div>
                    <div className="celebrities__page__celebrity__name">{data.name}</div>
                </div>
            )
        })
        return (
            <>
                <h2>{el.category}</h2>
                <div className="celebrities__page__category">{cel}</div>
            </>
        )
    })
    useEffect(() => {
        setCelebritiesByCategory()
    }, [slider1, slider2, categories, rating, review])
    const popularButtons = categoriesData.popularCategories.map((el) => {
        return (
            <button
                key={el}
                className="celebrities__pc__filters__categories__button"
                onClick={() => {
                    if (categories.length != 0) {
                        let array = categories
                        let newArray = []
                        let alreadySelected = false
                        for (let i = 0; i < array.length; i++) {
                            if (array[i] == el) {
                                alreadySelected = true
                            } else {
                                newArray.push(array[i])
                            }
                        }
                        if (!alreadySelected) {
                            newArray.push(el)
                        }
                        setCategories(newArray)
                    } else {
                        setCategories([el])
                    }
                }}
            >
                {el}
            </button>
        )
    })
    const normalCategories = categoriesData.normalCategories.map((el, index) => {
        return (
            <button
                key={index}
                className="celebrities__pc__filters__categories__button"
                onClick={() => {
                    handleCategoriesClick(el)
                }}
            >
                {el}
            </button>
        )
    })
    const setCelebritiesByCategory = () => {
        let array = []
        if (categories.length == 0) {
            const allCel = data.celebrities
            const popularCategories = categoriesData.popularCategories
            const normalCategories = categoriesData.normalCategories

            for (let i = 0; i < popularCategories.length; i++) {
                let newArray = []
                for (let k = 0; k < allCel.length; k++) {
                    const celCategories = allCel[k].categories
                    for (let l = 0; l < celCategories.length; l++) {
                        const celCategory = celCategories[l]
                        if (popularCategories[i] == celCategory) {
                            newArray.push(allCel[k])
                        }
                    }
                }
                if (newArray.length !== 0) {
                    array.push({ category: popularCategories[i], array: newArray })
                }
            }
            for (let i = 0; i < normalCategories.length; i++) {
                let newArray = []
                for (let k = 0; k < allCel.length; k++) {
                    const celCategories = allCel[k].categories
                    for (let l = 0; l < celCategories.length; l++) {
                        const celCategory = celCategories[l]
                        if (normalCategories[i] == celCategory) {
                            newArray.push(allCel[k])
                        }
                    }
                }
                if (newArray.length !== 0) {
                    array.push({ category: normalCategories[i], array: newArray })
                }
            }
        } else {
            const allCel = data.celebrities

            for (let i = 0; i < categories.length; i++) {
                let newArray = []
                for (let k = 0; k < allCel.length; k++) {
                    const celCategories = allCel[k].categories
                    for (let l = 0; l < celCategories.length; l++) {
                        const celCategory = celCategories[l]
                        if (categories[i] == celCategory) {
                            newArray.push(allCel[k])
                        }
                    }
                }
                array.push({ category: categories[i], array: newArray })
            }
        }
        if (slider1 !== "" && slider2 !== "") {
            const celebritiesAll = array
            array = []
            let min
            let max
            if (slider1 <= slider2) {
                min = slider1 * 2
                max = slider2 * 2
            } else {
                min = slider2 * 2
                max = slider1 * 2
            }
            for (let i = 0; i < celebritiesAll.length; i++) {
                let newArray = []
                const celebrities = celebritiesAll[i].array
                for (let k = 0; k < celebrities.length; k++) {
                    const cel = celebrities[k]
                    if (cel.price >= min && cel.price <= max) {
                        newArray.push(celebrities[k])
                    }
                }
                if (newArray.length !== 0) {
                    array.push({ category: celebritiesAll[i].category, array: newArray })
                }
            }
        }
        if (rating !== 0) {
            const celebritiesAll = array
            array = []

            for (let i = 0; i < celebritiesAll.length; i++) {
                let newArray = []
                const celebrities = celebritiesAll[i].array
                for (let k = 0; k < celebrities.length; k++) {
                    const cel = celebrities[k]
                    if (cel.rating >= rating) {
                        newArray.push(celebrities[k])
                    }
                }
                if (newArray.length !== 0) {
                    array.push({ category: celebritiesAll[i].category, array: newArray })
                }
            }
        }
        if (review != "") {
            const celebritiesAll = array
            array = []

            for (let i = 0; i < celebritiesAll.length; i++) {
                let newArray = []
                const celebrities = celebritiesAll[i].array
                for (let k = 0; k < celebrities.length; k++) {
                    const cel = celebrities[k]
                    if (cel.reviews >= review) {
                        newArray.push(celebrities[k])
                    }
                }
                if (newArray.length !== 0) {
                    array.push({ category: celebritiesAll[i].category, array: newArray })
                }
            }
        }
        setAllCelebrities(array)
    }
    useEffect(() => {}, [])
    useEffect(() => {
        const nav = document.querySelector(".nav")
        nav.style.position = "fixed"
    }, [])
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 75) {
                // User has scrolled to the top
                // Perform any desired actions here
                const nav = document.querySelector(".nav")
                nav.style.position = "fixed"
                nav.style.background =
                    "linear-gradient(180deg,rgba(17, 24, 39, 1) 0%, rgba(17, 24, 39, 1) 100%)"
            } else {
                const nav = document.querySelector(".nav")
                nav.style.position = "fixed"
                nav.style.background =
                    "linear-gradient(180deg,rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0) 100%)"
            }
        }

        window.addEventListener("scroll", handleScroll)

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    useEffect(() => {
        const slider1 = document.querySelector("#slider-1")
        const slider2 = document.querySelector("#slider-2")
        slider1.value = "0"
        slider2.value = "100"
        setSlider1(0)
        setSlider2(100)
    }, [])
    useEffect(() => {
        const sliderTrack = document.querySelector(".slider-track")
        if (slider1 <= slider2) {
            sliderTrack.style.background = `linear-gradient(to right, #101c3314 ${slider1}%, #101C33 ${slider1}%, #101C33 ${slider2}%, #101c3314 ${slider2}%)`
        } else {
            sliderTrack.style.background = `linear-gradient(to right, #101c3314 ${slider2}%, #101C33 ${slider2}%, #101C33 ${slider1}%, #101c3314 ${slider1}%)`
        }
    }, [slider1, slider2])
    const handleCategoriesClick = async (category) => {
        let array = categories
        let newArray = []
        let alreadySelected = false
        for (let i = 0; i < array.length; i++) {
            if (array[i] == category) {
                alreadySelected = true
            } else {
                newArray.push(array[i])
            }
        }
        if (!alreadySelected) {
            newArray.push(category)
        }
        setCategories(newArray)
    }
    useEffect(() => {
        const buttons = document.querySelectorAll(".celebrities__pc__filters__categories__button")

        for (let i = 0; i < buttons.length; i++) {
            const buttonCategory = buttons[i].innerText

            if (categories.includes(buttonCategory)) {
                buttons[i].classList.add("category-button-active")
            } else {
                buttons[i].classList.remove("category-button-active")
            }
        }
    }, [categories])
    useEffect(() => {
        function handleResize() {
            const filters = document.querySelector(".celebrities__pc__filters")
            if (window.innerWidth > 1150) {
                filters.style.left = "0"
                filters.style.width = "400px"
            } else {
                filters.style.width = "350px"
            }
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])
    useEffect(() => {
        /*     document
            .querySelector(".celebrities__pc__filters__categories")
            .scrollIntoView({ behavior: "smooth" }) */
        window.scroll({ top: 0, behavior: "smooth" })
    }, [])
    return (
        <>
            <Head>
                <title>PM Agency</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo1.png" />
            </Head>
            <div className="body">
                <Navbar />
                <div className="cel__backgound">
                    <ExportedImage
                        src={backgroundGradient}
                        alt="Orginal, unoptimized image"
                        unoptimized={true}
                    />
                    <div className="cel__backgound__layer"></div>
                </div>
                <div className="celebrities__padding">
                    <div className="celebrities__pc__filters">
                        <FontAwesomeIcon
                            icon={faClose}
                            className="closeFilters"
                            onClick={() => {
                                const filters = document.querySelector(".celebrities__pc__filters")
                                filters.style.left = "-355px"
                            }}
                        />
                        <ExportedImage
                            src={logo}
                            alt="Orginal, unoptimized image"
                            unoptimized={true}
                            onClick={() => {
                                router.push({
                                    pathname: "../",
                                })
                            }}
                            id="logo"
                        />
                        <h2>Filter by category</h2>
                        <div className="celebrities__pc__filters__categories">
                            {normalCategories}
                        </div>
                        <h2>Price Range</h2>
                        <div className="celebrities__pc__filters__range">
                            <div className="slider-track"></div>
                            <input
                                type="range"
                                id="slider-1"
                                min="0"
                                max="100"
                                onChange={(event) => {
                                    setSlider1(parseInt(event.target.value))
                                }}
                            />
                            <input
                                type="range"
                                id="slider-2"
                                min="0"
                                max="100"
                                onChange={(event) => {
                                    setSlider2(parseInt(event.target.value))
                                }}
                            />
                        </div>
                        <div className="celebrities__pc__filters__range__values">
                            <p>
                                $
                                {slider1 <= slider2 && slider1 !== 100
                                    ? slider1 * 2
                                    : slider1 <= slider2 && slider1 == 100
                                    ? "200+"
                                    : slider2 < slider1
                                    ? slider2 * 2
                                    : slider1 > slider2 && slider2 == 100
                                    ? "200+"
                                    : ""}
                            </p>

                            <p>
                                $
                                {slider1 <= slider2 && slider2 !== 100
                                    ? slider2 * 2
                                    : slider1 <= slider2 && slider2 == 100
                                    ? "200+"
                                    : slider1 > slider2 && slider1 !== 100
                                    ? slider1 * 2
                                    : slider1 > slider2 && slider1 == 100
                                    ? "200+"
                                    : ""}
                            </p>
                        </div>
                        <h2>Number of Reviews</h2>
                        <div className="celebrities__pc__filters__reviews">
                            <div className="celebrities__pc__filters__reviews__option">
                                <button
                                    className={review == 10 ? "review-button-active" : ""}
                                    onClick={() => {
                                        if (review != 10) {
                                            setReview(10)
                                        } else {
                                            setReview("")
                                        }
                                    }}
                                ></button>
                                <p>10+ Reviews</p>
                            </div>
                            <div className="celebrities__pc__filters__reviews__option">
                                {" "}
                                <button
                                    className={review == 20 ? "review-button-active" : ""}
                                    onClick={() => {
                                        if (review != 20) {
                                            setReview(20)
                                        } else {
                                            setReview("")
                                        }
                                    }}
                                ></button>{" "}
                                <p>20+ Reviews</p>
                            </div>
                            <div className="celebrities__pc__filters__reviews__option">
                                <button
                                    className={review == 30 ? "review-button-active" : ""}
                                    onClick={() => {
                                        if (review != 30) {
                                            setReview(30)
                                        } else {
                                            setReview("")
                                        }
                                    }}
                                ></button>{" "}
                                <p>30+ Reviews</p>
                            </div>
                            <div className="celebrities__pc__filters__reviews__option">
                                {" "}
                                <button
                                    className={review == 40 ? "review-button-active" : ""}
                                    onClick={() => {
                                        if (review != 40) {
                                            setReview(40)
                                        } else {
                                            setReview("")
                                        }
                                    }}
                                ></button>{" "}
                                <p>40+ Reviews</p>
                            </div>
                        </div>
                        <h2>Minimum Rating</h2>
                        <div className="celebrities__pc__filters__rating">
                            <ExportedImage
                                src={rating >= 1 ? fullStar : emptyStar}
                                alt="Orginal, unoptimized image"
                                unoptimized={true}
                                className="star"
                                onClick={() => {
                                    if (rating == 1) {
                                        setRating((el) => {
                                            return el - 1
                                        })
                                    } else {
                                        setRating(1)
                                    }
                                }}
                            />
                            <ExportedImage
                                src={rating >= 2 ? fullStar : emptyStar}
                                alt="Orginal, unoptimized image"
                                unoptimized={true}
                                className="star"
                                onClick={() => {
                                    if (rating == 2) {
                                        setRating((el) => {
                                            return el - 1
                                        })
                                    } else {
                                        setRating(2)
                                    }
                                }}
                            />
                            <ExportedImage
                                src={rating >= 3 ? fullStar : emptyStar}
                                alt="Orginal, unoptimized image"
                                unoptimized={true}
                                className="star"
                                onClick={() => {
                                    if (rating == 3) {
                                        setRating((el) => {
                                            return el - 1
                                        })
                                    } else {
                                        setRating(3)
                                    }
                                }}
                            />
                            <ExportedImage
                                src={rating >= 4 ? fullStar : emptyStar}
                                alt="Orginal, unoptimized image"
                                unoptimized={true}
                                className="star"
                                onClick={() => {
                                    if (rating == 4) {
                                        setRating((el) => {
                                            return el - 1
                                        })
                                    } else {
                                        setRating(4)
                                    }
                                }}
                            />
                            <ExportedImage
                                src={rating >= 5 ? fullStar : emptyStar}
                                alt="Orginal, unoptimized image"
                                unoptimized={true}
                                className="star"
                                onClick={() => {
                                    if (rating == 5) {
                                        setRating((el) => {
                                            return el - 1
                                        })
                                    } else {
                                        setRating(5)
                                    }
                                }}
                            />
                            <p>{rating == 0 ? "" : rating + "+"}</p>
                        </div>
                    </div>
                    <div className="celebrities__mobile__filters"></div>
                    <div className="celebrities__page">
                        <h1>Popular Categories</h1>
                        <div className="celebrities__page__categories">{popularButtons}</div>
                        <div
                            className="celebrities__page__filters"
                            onClick={() => {
                                const filters = document.querySelector(".celebrities__pc__filters")
                                filters.style.left = "0px"
                            }}
                        >
                            {" "}
                            <FontAwesomeIcon icon={faFilter} className="fa" />
                            <h2>Filters</h2>
                        </div>
                        <div className="celebrities__page__celebrities">{foundCelebrities}</div>
                    </div>
                </div>
                <span className="celebrities__footer">
                    <Footer />
                </span>
            </div>
        </>
    )
}

export default Celebrities

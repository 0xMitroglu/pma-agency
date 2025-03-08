import React from "react"
import ExportedImage from "next-image-export-optimizer"
import backgroundGradient from "../../public/gradient.png"
import {
    faChevronLeft,
    faChevronRight,
    faStar,
    fa1,
    fa2,
    fa3,
    fa4,
    faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons"
import { checkout } from "@/checkout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useEffect } from "react"
import fullStar from "../../public/fullStar.png"
import emptyStar from "../../public/emptyStar.png"
import halfStar from "../../public/halfStar.png"
import celebritiesData from "../../celebrities.json"
import Footer from "../../hooks/Footer"
import Navbar from "@/hooks/Navbar"
import { useRouter } from "next/router"
import Head from "next/head"
const Celebrity = ({ name }) => {
    const router = useRouter()
    const [props, setProps] = useState(() => {
        const array = celebritiesData.celebrities
        for (let i = 0; i < array.length; i++) {
            if (array[i].name.toLowerCase() == name.toLowerCase()) {
                console.log(array[i])
                return { data: array[i] }
            }
        }
    })
    const [rating, setRating] = useState([])
    const [galleryItems, setGalleryItems] = useState([])
    const [reviews, setReviews] = useState([])
    const [categories, setCategories] = useState([])
    const [celebrities, setCelebrities] = useState([])
    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" })
    }, [props])
    useEffect(() => {
        const nav = document.querySelector(".nav")
        nav.style.position = "fixed"
    }, [])
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 30) {
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
        const array = props.data.categories
        const allCeelebrities = celebritiesData.celebrities
        let celebritiesArray = []
        for (let i = 0; i < allCeelebrities.length; i++) {
            const categoriesArray = allCeelebrities[i].categories
            let exit = false
            for (let l = 0; l < categoriesArray.length && !exit; l++) {
                for (let k = 0; k < array.length && !exit; k++) {
                    if (
                        categoriesArray[l] == array[k] &&
                        allCeelebrities[i].name !== props.data.name
                    ) {
                        celebritiesArray.push(allCeelebrities[i])
                        exit = true
                        // Break both loops
                    }
                }
            }
        }
        setCelebrities(celebritiesArray)
        setCategories(array)
        console.log("hi")
    }, [props.data])
    useEffect(() => {
        const array = props.data.reviewsText
        setReviews(array)
    }, [])
    const celebritiesBox = celebrities.map((el, index) => {
        return (
            <div className="celebrity__celebrities__box" key={index}>
                <img src={el.imageFront} />
                <button
                    onClick={() => {
                        router.push({
                            pathname: `/celebrities/${el.name}`,
                        })

                        setProps({ data: el })
                    }}
                >
                    Visit
                </button>
            </div>
        )
    })
    const categoriesBox = categories.map((el, index) => {
        return (
            <div className="celebrity__categories__box" key={index}>
                <h1>{el}</h1> <FontAwesomeIcon icon={faChevronRight} className="fa" />
            </div>
        )
    })
    const reviewsBox = reviews.map((el, index) => {
        return (
            <div key={index} className="celebrity__reviews__box">
                <div className="celebrity__reviews__box__header">
                    <div className="celebrity__reviews__box__header__col1">
                        <img src={el.profileImage}></img>
                    </div>

                    <div className="celebrity__reviews__box__header__col2">
                        <h2>{el.name} </h2>
                        <div className="celebrity__reviews__box__header__col2__rating">
                            Rating: {el.rating}
                            <FontAwesomeIcon icon={faStar} className="fa" />
                        </div>
                    </div>
                </div>
                <div className="celebrity__reviews__box__text">{el.text}</div>
            </div>
        )
    })
    const updateImagesRight = () => {
        let carouselArray = galleryItems
        carouselArray.push(carouselArray.shift())
        carouselArray.forEach((el) => {
            el.classList.remove("gallery-item-1")
            el.classList.remove("gallery-item-2")
            el.classList.remove("gallery-item-3")
            el.classList.remove("gallery-item-4")
            el.classList.remove("gallery-item-5")
        })
        carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`)
        })

        setGalleryItems(carouselArray)
    }
    const updateImagesLeft = () => {
        let carouselArray = galleryItems
        carouselArray.unshift(carouselArray.pop())
        carouselArray.forEach((el) => {
            el.classList.remove("gallery-item-1")
            el.classList.remove("gallery-item-2")
            el.classList.remove("gallery-item-3")
            el.classList.remove("gallery-item-4")
            el.classList.remove("gallery-item-5")
        })
        carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`)
        })

        setGalleryItems(carouselArray)
    }
    useEffect(() => {
        const galleryItems = document.querySelectorAll(".gallery-item")
        let carouselArray = [...galleryItems]
        setGalleryItems(carouselArray)
    }, [])

    useEffect(() => {
        const rating = props.data.rating
        let stars = []
        let rest = rating

        for (let i = 1; i <= rating; i++) {
            rest -= 1
            stars.push({ type: "full", className: "star" })
        }

        if (rest > 0.4) {
            stars.push({ type: "half", className: "star" })
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push({ type: "empty", className: "star" })
        }

        setRating(stars)
    }, [props.data.rating])

    const ratingStars = rating.map((el, index) => {
        return (
            <ExportedImage
                key={index}
                src={
                    el.type == "full"
                        ? fullStar
                        : el.type == "half"
                        ? halfStar
                        : el.type == "empty"
                        ? emptyStar
                        : ""
                }
                alt="Orginal, unoptimized image"
                unoptimized={true}
                className="star"
            />
        )
    })
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
                <div
                    className="celebrity__return"
                    onClick={() => {
                        router.push({
                            pathname: `/celebrities`,
                        })
                    }}
                >
                    {" "}
                    <FontAwesomeIcon
                        icon={faArrowTurnDown}
                        id="faReturn"
                        onClick={updateImagesLeft}
                    />
                    return
                </div>
                <div className="celebrity">
                    <div className="celebrity__info">
                        <div className="celebrity__info__col1">
                            <h1>{props.data.name}</h1>
                            <div className="celebrity__info__rating">
                                <div className="stars">{ratingStars}</div>
                                <p>{props.data.reviews}+ reviews</p>
                            </div>
                            <h2>About {props.data.name}</h2>
                            <p className="celebrity__info__col1__description">
                                {props.data.description}
                            </p>
                        </div>

                        <div className="celebrity__info__col2">
                            <div className="celebrity__info__col2__left">
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="fa"
                                    onClick={updateImagesLeft}
                                />
                            </div>
                            <div className="gallery-container">
                                <img
                                    src={props.data.images[0]}
                                    className="gallery-item gallery-item-1"
                                />
                                <img
                                    src={props.data.images[1]}
                                    className="gallery-item gallery-item-2"
                                />
                                <img
                                    src={props.data.imageFront}
                                    className="gallery-item gallery-item-3"
                                />
                                <img
                                    src={props.data.images[2]}
                                    className="gallery-item gallery-item-4"
                                />
                                <img
                                    src={props.data.images[3]}
                                    className="gallery-item gallery-item-5"
                                />
                            </div>
                            <div className="celebrity__info__col2__right">
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="fa"
                                    onClick={updateImagesRight}
                                />
                            </div>
                        </div>
                        <div className="celebrity__info__col1 celebrity__mobile">
                            <h1>{props.data.name}</h1>
                            <div className="celebrity__info__rating">
                                <div className="stars">{ratingStars}</div>
                                <p>{props.data.reviews}+ reviews</p>
                            </div>
                            <h2>About {props.data.name}</h2>
                            <p className="celebrity__info__col1__description">
                                {props.data.description}
                            </p>
                        </div>
                    </div>
                    <div className="celebrity__button">
                        <div className="celebrity__button__col1"></div>
                        <div className="celebrity__button__col2">
                            <button
                                onClick={() => {
                                    checkout(
                                        {
                                            lineItems: [
                                                {
                                                    price: props.data.stripesPrice,
                                                    quantity: 1,
                                                },
                                            ],
                                        },
                                        props.data.name
                                    )
                                }}
                            >
                                Book from ${props.data.price}
                            </button>
                        </div>
                    </div>
                    <div className="celebrity__reviews">
                        <h2>Reviews</h2>
                        <div className="celebrity__reviews__boxes">{reviewsBox}</div>
                    </div>
                    <div className="celebrity__categories">
                        <h2>Related categories</h2>
                        <div className="celebrity__categories__boxes">{categoriesBox}</div>
                    </div>
                    <div className="celebrity__instruction">
                        <h2>How it works</h2>

                        <div className="celebrity__instruction__boxes">
                            <div className="celebrity__instruction__box">
                                <div className="celebrity__instruction__number">
                                    <span>1</span>
                                </div>
                                <div className="celebrity__instruction__text">
                                    <h2>Find a celebrity</h2>
                                    <p>
                                        Thousands of celebrities, ready to record the perfect video
                                        message
                                    </p>
                                </div>
                            </div>

                            <div className="celebrity__instruction__box">
                                <div className="celebrity__instruction__number">
                                    {" "}
                                    <span>2</span>
                                </div>
                                <div className="celebrity__instruction__text">
                                    <h2>Book them</h2>
                                    <p>Describe what you want to include in the video</p>
                                </div>
                            </div>

                            <div className="celebrity__instruction__box">
                                <div className="celebrity__instruction__number">
                                    <span>3</span>
                                </div>
                                <div className="celebrity__instruction__text">
                                    <h2>Get your video</h2>
                                    <p>
                                        The celebrity records your personalized video and sends it
                                        your way
                                    </p>
                                </div>
                            </div>

                            <div className="celebrity__instruction__box">
                                <div className="celebrity__instruction__number">
                                    <span>4</span>
                                </div>
                                <div className="celebrity__instruction__text">
                                    <h2>Share your joy</h2>
                                    <p>
                                        Gift the video and watch an unforgettable reaction unfold
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="celebrity__celebrities">
                        <h2>You might also like</h2>
                        <div className="celebrity__celebrities__boxes">{celebritiesBox}</div>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Celebrity
export async function getServerSideProps({ params }) {
    const { name } = params
    return {
        props: {
            name,
        },
    }
}

import React, { useState, useEffect } from "react"
import ExportedImage from "next-image-export-optimizer"
import backgroundGradient from "../public/gradient.png"
import top from "../top.json"
import trending from "../trending.json"
import sport from "../sport.json"
import actors from "../actors.json"
import music from "../music.json"

import { fa1, fa2, fa3, fa4, faPlay, faStop, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import Footer from "./Footer"
const HomePage = (props) => {
    const router = useRouter()
    const [playTrending, setPlayTrending] = useState(null)
    const [playMusic, setPlayMusic] = useState(null)
    const [playSport, setPlaySport] = useState(null)
    const [playActors, setPlayActors] = useState(null)
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
    const persons = top.top.map((el) => {
        return (
            <div className="home__page1__top__person">
                <img src={el.image}></img>
                <button>Learn More</button>
            </div>
        )
    })
    const musicPeople = music.music.map((el, index) => {
        return (
            <div className="home__page2__discover__person" key={index}>
                <div className="home__page2__discover__person__img">
                    {playMusic == index ? (
                        <iframe
                            width="200px"
                            height="250px"
                            src={el.video}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    ) : (
                        <>
                            <img src={el.image}></img>
                        </>
                    )}
                    <div className="home__page2__discover__person__play">
                        <span className="home__page2__discover__person__play__price">
                            ${el.price}
                        </span>
                        <span
                            className="faPlay"
                            onClick={() => {
                                if (playMusic == index) {
                                    setPlayMusic(null)
                                } else {
                                    setPlayMusic(index)
                                }
                            }}
                        >
                            <FontAwesomeIcon
                                icon={playMusic == index ? faStop : faPlay}
                                className="fa"
                            />
                        </span>
                    </div>
                </div>
                <div className="home__page2__discover__person__info">
                    <div className="home__page2__discover__person__title">
                        <h1>{el.name}</h1>
                        <span className="home__page2__discover__person__rating">
                            <FontAwesomeIcon icon={faStar} className="fa" /> <p>{el.rating}</p>
                        </span>
                    </div>
                    <div className="home__page2__discover__person__description">
                        <p>{el.description}</p>
                    </div>
                </div>
            </div>
        )
    })
    const actorsPeople = actors.actors.map((el, index) => {
        return (
            <div className="home__page2__discover__person" key={index}>
                <div className="home__page2__discover__person__img">
                    {playActors == index ? (
                        <iframe
                            width="200px"
                            height="250px"
                            src={el.video}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    ) : (
                        <>
                            <img src={el.image}></img>
                        </>
                    )}
                    <div className="home__page2__discover__person__play">
                        <span className="home__page2__discover__person__play__price">
                            ${el.price}
                        </span>
                        <span
                            className="faPlay"
                            onClick={() => {
                                if (playActors == index) {
                                    setPlayActors(null)
                                } else {
                                    setPlayActors(index)
                                }
                            }}
                        >
                            <FontAwesomeIcon
                                icon={playActors == index ? faStop : faPlay}
                                className="fa"
                            />
                        </span>
                    </div>
                </div>
                <div className="home__page2__discover__person__info">
                    <div className="home__page2__discover__person__title">
                        <h1>{el.name}</h1>
                        <span className="home__page2__discover__person__rating">
                            <FontAwesomeIcon icon={faStar} className="fa" /> <p>{el.rating}</p>
                        </span>
                    </div>
                    <div className="home__page2__discover__person__description">
                        <p>{el.description}</p>
                    </div>
                </div>
            </div>
        )
    })
    const sportsPeople = sport.sport.map((el, index) => {
        return (
            <div className="home__page2__discover__person" key={index}>
                <div className="home__page2__discover__person__img">
                    {playSport == index ? (
                        <iframe
                            width="200px"
                            height="250px"
                            src={el.video}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    ) : (
                        <>
                            <img src={el.image}></img>
                        </>
                    )}
                    <div className="home__page2__discover__person__play">
                        <span className="home__page2__discover__person__play__price">
                            ${el.price}
                        </span>
                        <span
                            className="faPlay"
                            onClick={() => {
                                if (playSport == index) {
                                    setPlaySport(null)
                                } else {
                                    setPlaySport(index)
                                }
                            }}
                        >
                            <FontAwesomeIcon
                                icon={playSport == index ? faStop : faPlay}
                                className="fa"
                            />
                        </span>
                    </div>
                </div>
                <div className="home__page2__discover__person__info">
                    <div className="home__page2__discover__person__title">
                        <h1>{el.name}</h1>
                        <span className="home__page2__discover__person__rating">
                            <FontAwesomeIcon icon={faStar} className="fa" /> <p>{el.rating}</p>
                        </span>
                    </div>
                    <div className="home__page2__discover__person__description">
                        <p>{el.description}</p>
                    </div>
                </div>
            </div>
        )
    })
    const trendingPeople = trending.trending.map((el, index) => {
        return (
            <div className="home__page2__discover__person" key={index}>
                <div className="home__page2__discover__person__img">
                    {playTrending == index ? (
                        <iframe
                            width="200px"
                            height="250px"
                            src={el.video}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    ) : (
                        <>
                            <img src={el.image}></img>
                        </>
                    )}
                    <div className="home__page2__discover__person__play">
                        <span className="home__page2__discover__person__play__price">
                            ${el.price}
                        </span>
                        <span
                            className="faPlay"
                            onClick={() => {
                                if (playTrending == index) {
                                    setPlayTrending(null)
                                } else {
                                    setPlayTrending(index)
                                }
                            }}
                        >
                            <FontAwesomeIcon
                                icon={playTrending == index ? faStop : faPlay}
                                className="fa"
                            />
                        </span>
                    </div>
                </div>
                <div className="home__page2__discover__person__info">
                    <div className="home__page2__discover__person__title">
                        <h1>{el.name}</h1>
                        <span className="home__page2__discover__person__rating">
                            <FontAwesomeIcon icon={faStar} className="fa" /> <p>{el.rating}</p>
                        </span>
                    </div>
                    <div className="home__page2__discover__person__description">
                        <p>{el.description}</p>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="home__page">
                <div className="home__page__backgroundGradient">
                    <ExportedImage
                        src={backgroundGradient}
                        alt="Orginal, unoptimized image"
                        unoptimized={true}
                    />
                </div>
                <div className="home__page1">
                    <div className="home__page1__text">
                        <h1>
                            Get Personalized Video Messages
                            <br></br>
                            From Celebrities
                        </h1>
                        <p>
                            Get Fast, Reliable, and Affordable Celebrity Video Messages with our
                            Guaranteed Service!
                        </p>
                        <div className="home__page1__text__button">
                            <button
                                onClick={() => {
                                    router.push({
                                        pathname: "celebrities",
                                    })
                                }}
                            >
                                Get Your Celebrity Video Message Now!
                            </button>
                        </div>
                    </div>
                    {
                        <div className="home__page1__top">
                            <div className="home__page1__top__col1">
                                <h1>Our Top Celebrities</h1>
                                <p>
                                    Embark on a journey of stardom as you explore our roster of top
                                    celebrities, ready to create unforgettable moments just for
                                    you.
                                </p>
                            </div>
                            <div className="home__page1__top__col2">{persons}</div>
                        </div>
                    }
                </div>
                <div className="home__page2">
                    <div className="home__page2__instruction">
                        <div className="home__page2__instruction__box">
                            <div className="home__page2__instruction__title">
                                <div className="home__page2__instruction__fa">
                                    <FontAwesomeIcon icon={fa1} className="fa" />
                                </div>
                                <h1> Find a celebrity</h1>
                            </div>
                            <div className="home__page2__instruction__text">
                                <p>
                                    Thousands of celebrities, ready to record the perfect video
                                    message
                                </p>
                            </div>
                        </div>
                        <div className="home__page2__instruction__box">
                            <div className="home__page2__instruction__title">
                                <div className="home__page2__instruction__fa">
                                    <FontAwesomeIcon icon={fa2} className="fa" />
                                </div>
                                <h1> Book them</h1>{" "}
                            </div>
                            <div className="home__page2__instruction__text">
                                <p>Describe what you want to include in the video </p>
                            </div>
                        </div>
                        <div className="home__page2__instruction__box">
                            <div className="home__page2__instruction__title">
                                <div className="home__page2__instruction__fa">
                                    <FontAwesomeIcon icon={fa3} className="fa" />
                                </div>
                                <h1> Get your video</h1>{" "}
                            </div>
                            <div className="home__page2__instruction__text">
                                <p>
                                    The celebrity records your personalized video and sends it your
                                    way{" "}
                                </p>
                            </div>
                        </div>
                        <div className="home__page2__instruction__box">
                            <div className="home__page2__instruction__title">
                                <div className="home__page2__instruction__fa">
                                    <FontAwesomeIcon icon={fa4} className="fa" />
                                </div>
                                <h1>Share your joy</h1>
                            </div>
                            <div className="home__page2__instruction__text">
                                <p>Gift the video and watch an unforgettable reaction unfold </p>
                            </div>
                        </div>
                    </div>
                    <div className="home__page2__discover">
                        <h1>Find Your Favorite Celebrities</h1>
                        <h2>Trending</h2>
                        <div className="home__page2__discover__box">{trendingPeople}</div>
                        <h2>Sports</h2>
                        <div className="home__page2__discover__box">{sportsPeople}</div>
                        <h2>Actors</h2>
                        <div className="home__page2__discover__box">{actorsPeople}</div>
                        <h2>Music</h2>
                        <div className="home__page2__discover__box">{musicPeople}</div>
                    </div>
                    <div className="home__page2__view">
                        <h1>Want to see all?</h1>
                        <button
                            onClick={() => {
                                router.push({
                                    pathname: "celebrities",
                                })
                            }}
                        >
                            View All
                        </button>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default HomePage

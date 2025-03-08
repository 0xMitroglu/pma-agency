import React from "react"
import ExportedImage from "next-image-export-optimizer"
import logoCut from "../public/logoCut1Dark.png"
import logo from "../public/logoCut.png"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
const Navbar = (props) => {
    const [showNav, setShowNav] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const router = useRouter()
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    useEffect(() => {
        if (showNav) {
            const nav = document.querySelector(".nav__mobile__box")
            nav.style.top = "0px"
            const fa = document.querySelector(".fa")
            fa.style.color = "black"
        } else {
            const nav = document.querySelector(".nav__mobile__box")
            nav.style.top = "-100vh"
            const fa = document.querySelector(".fa")
            fa.style.color = "white"
        }
    }, [showNav])
    return (
        <div className="nav">
            <div className="nav__image">
                {props.page == "celebrities" && windowWidth > 1150 ? (
                    <ExportedImage
                        src={logo}
                        alt="Orginal, unoptimized image"
                        unoptimized={true}
                        onClick={() => {
                            router.push({
                                pathname: "../",
                            })
                        }}
                    />
                ) : (
                    <ExportedImage
                        src={logoCut}
                        alt="Orginal, unoptimized image"
                        unoptimized={true}
                        onClick={() => {
                            router.push({
                                pathname: "../",
                            })
                        }}
                    />
                )}
            </div>
            <li>
                <ul
                    onClick={() => {
                        router.push({
                            pathname: "/celebrities",
                        })
                    }}
                >
                    Find Talents
                </ul>
                <ul>Enroll as Profile</ul>
                <ul>Blog</ul>
                <ul>Help & Contact</ul>
            </li>
            <div className="nav__account">
                <button className="nav__account__sign">Sign in</button>
                <button className="nav__account__started">Get started</button>
            </div>

            <div className="nav__mobile">
                <div className="nav__mobile__box">
                    <ExportedImage
                        src={logo}
                        alt="Orginal, unoptimized image"
                        unoptimized={true}
                        className="nav__mobile__box__image"
                        onClick={() => {
                            router.push({
                                pathname: "/",
                            })
                        }}
                    />
                    <div id="nav__mobile__box__links">
                        <div
                            onClick={() => {
                                router.push({
                                    pathname: "/celebrities",
                                })
                            }}
                        >
                            Find Talents
                        </div>
                        <div>Enroll as Profile</div>
                        <div>Blog</div>
                        <div>Help & Contact</div>
                    </div>
                    <div className="nav__mobile__acount">
                        <button className="nav__account__sign">Sign in</button>
                        <button className="nav__account__started">Get started</button>
                    </div>
                </div>
                {showNav ? (
                    <FontAwesomeIcon
                        icon={faClose}
                        className="fa"
                        onClick={() => {
                            setShowNav((prev) => {
                                return !prev
                            })
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faBars}
                        className="fa"
                        onClick={() => {
                            setShowNav((prev) => {
                                return !prev
                            })
                        }}
                    />
                )}
            </div>
        </div>
    )
}
export default Navbar

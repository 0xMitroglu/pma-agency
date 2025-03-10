import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
/* Hooks */
import HomePage from "@/hooks/HomePage"
import Navbar from "@/hooks/Navbar"
export default function Home() {
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
                <HomePage />
            </div>
        </>
    )
}

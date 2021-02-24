import React, { useState,useEffect } from "react"
import { api, repos } from "../Api/api"
import Resume from "../Component/resume"
import styles from "./index.module.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Main = () => {
  const [state, setState] = useState(true)
  const [data, setData] = useState(null)
  const [repo, setRepo] = useState(null)
  const [contri, setContri] = useState(null)
  const [lang, setLang] = useState(null)

  // Sets starting state as true so it shows the first page
  useEffect(() => {
    setState(true)
  }, [])

  //Sets the data received from the github api
  const printdata = data => {
    setData(data)
    setState(false)
  }

  //Sets the Repos, Contributions, and the languages used
  const printrepo = repo => {
    let rl = [],
      cl = [],
      ll = []
    repo.map(i => {
      if (i[2] === true) {
        return cl.push(i)
      } else {
        return rl.push(i)
      }
    })
    rl.map(i => {
      return ll.push(i[5])
    })
    setRepo(rl.slice(0, 5))
    setContri(cl.slice(0, 5))
    let lang = [...new Set(ll)]
    setLang(lang)
  }

  //Function for handling button click 
  const getUserHandler = e => {
    e.preventDefault()
    setData(null)
    setRepo(null)
    setContri(null)
    setLang(null)
    setState(null)
    const user = document.getElementById("input").value
    api(user, printdata)
    repos(user, printrepo)
  }

  //Function to print the page
  const print = () => {
    window.print()
  }


  return (
    <div>
      {/* Checks if the state is true
      If true then shows the first page 
      else shows the other page  */}
      {state ? (
        // First page
        <div className={styles.c}>
          <div className={styles.a}>
            <p>
              <span>
                <img src="./gh.png" alt="Github"></img>
              </span>
              <span className={styles.e}> Resume</span>
            </p>
            <p>Get your resume based on information on github</p>
            <div className={styles.b}>
              <input
                placeholder="Username"
                id="input"
                className={styles.input}
              ></input>
              <br />
              <button onClick={getUserHandler} className={styles.button}>
                Generate
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Second page
        <div>
          <div className={styles.d}>
            {/* Passes the information received from the api to the resume component */}
            <Resume data={data} repo={repo} contri={contri} lang={lang} />
          </div>
          <div>
            {data === null ? null : (
              <div className={styles.f}>
                <div className={styles.g}>
                  <button className={styles.button} onClick={print}>
                    Print
                  </button>
                </div>
                <div className={styles.g}>
                  <button className={styles.button} onClick={()=>setState(true)}>
                    Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Main

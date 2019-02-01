import React, { Component } from "react"
import ReactDOM from "react-dom"
import App from './app/App'

const wrapper = document.getElementById("index")

wrapper ? ReactDOM.render(<App />, wrapper) : false;
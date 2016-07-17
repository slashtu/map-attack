import React, { Component } from 'react'
import { render } from 'react-dom'
import App from './components/App'


$(function(){
  render(
		<App/>, document.querySelector( '.container' )
	)	
})


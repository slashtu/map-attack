import React, { Component, PropTypes } from 'react'
import DesktopApp from './DesktopApp'
import MobileApp from './MobileApp'

export default class App extends Component {



	render() {

		var width = $(document).width()

		if(width > 99999){

			return(
				<DesktopApp />
			)

		}else{
			return(
				<MobileApp />
			)
		}
	}
}
import React from "react"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
//import any sub-components

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			state: ''
		}
		this.setStateOfPR = this.setStateOfPR.bind(this)
	}

	setStateOfPR (ev) {
    if (ev.target.name === 'State') {
			if (ev.target.value === 'Open' || ev.target.value === 'Closed')
      this.setState({
        state: ev.target.value
			})
    }
	}

	render () {
	return (
		<div id = "landing">
			<h1>Ramda Pull Requests</h1>
			<Grid>
				<TextField
					select label="State of PR"
					id="State"
					name="State"
					//required
					style={{ width: 300 }}
					onChange={this.setStateOfPR}
					variant="filled">
					<MenuItem value="All">All</MenuItem>
					<MenuItem value="Open">Open</MenuItem>
					<MenuItem value="Closed">Closed</MenuItem>
				</TextField>
			</Grid>
			<h2>Total Count: </h2>
		</div>
	)
	}
}

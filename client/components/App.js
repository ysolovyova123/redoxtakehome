import React from "react"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			prState: '',
			prCount: ''
		}
		this.setStateOfPR = this.setStateOfPR.bind(this)
		this.generateCount = this.generateCount.bind(this)
		this.getResults = this.getResults.bind(this)
	}

	setStateOfPR (ev) {
    if (ev.target.name === 'State') {
			if (ev.target.value === 'open' || ev.target.value === 'closed')
      this.setState({
        prState: ev.target.value
			})
			if (ev.target.value === 'all') {
				this.setState({
					prState: ''
				})
			}
    }
	}
	async getResults(prState) {
		let url
		if (prState === '') {
			url = `https://api.github.com/search/issues?q=org:ramda+is:pr`
		}
		else {
			url = `https://api.github.com/search/issues?q=org:ramda+is:pr+state:${this.state.prState}`
		}
		// let response = await axios.get(url)
		let response = await fetch(url)
		console.log('RESPONSE')
		console.log(response)
		let result = await response.json()
		console.log('RESULT')
		console.log(result)
		console.log('COUNT')
		console.log(result.total_count)
		return result
	}

	async generateCount (e) {
		e.preventDefault()
		console.log('button clicked')
		let {prState} = this.state
		let finalResults = await this.getResults(prState)
		this.setState({
			prCount: finalResults.total_count
		})
		console.log('COUNT IS NOW IN STATE: ', this.state.prCount)
	}
	render () {
	return (
		<div id = "landing">
			<h1>Ramda Pull Requests</h1>
			<Grid>
				<TextField
					select label="State of PR (Default: All)"
					id="State"
					name="State"
					//required
					style={{ width: 300 }}
					onChange={this.setStateOfPR}
					variant="filled">
					<MenuItem value="all">All</MenuItem>
					<MenuItem value="open">Open</MenuItem>
					<MenuItem value="closed">Closed</MenuItem>
				</TextField>
			</Grid>
			<Button className="generatePRCountButton" variant="contained" color="secondary" onClick={this.generateCount}>Generate PR Count</Button>
			<h2>Total Count: {this.state.prCount}</h2>

		</div>
	)
	}
}

import React from "react"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import PRsContainer from './PRsContainer'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			prState: '',
			prCount: '',
			prs: []
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
			url = `https://api.github.com/search/issues?q=org:ramda+is:pr&per_page=100`
		}
		else {
			url = `https://api.github.com/search/issues?q=org:ramda+is:pr+state:${this.state.prState}&per_page=100`
		}
		// let response = await axios.get(url)
		let response = await fetch(url)
		// console.log('RESPONSE')
		// console.log(response)
		let results = await response.json()
		// console.log('RESULT')
		// console.log(results)
		// console.log('FIRST RESULT DATE IS')
		// console.log(results.items[0].created_at)
		// console.log('NOW WITH TEXT TRIMMED')
		// console.log(results.items[0].created_at.substring(0,10))
		// console.log('COUNT')
		// console.log(results.total_count)
		return results
	}

	async generateCount (e) {
		e.preventDefault()
		console.log('button clicked')
		let {prState} = this.state
		let finalResults = await this.getResults(prState)
		this.setState({
			prCount: finalResults.total_count,
			prs: finalResults.items
		})
		// console.log('COUNT IS NOW IN STATE: ', this.state.prCount)
		// console.log('RESULTS ARE NOW IN STATE: ', this.state.prs)
	}
	render () {
	return (
		<div id = "mainContainer">
			<h1>Ramda Organization Pull Requests</h1>
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
			<br></br>
			<button className="generatePRCountButton" onClick={this.generateCount}>Generate PR Count</button>
			<h2>Pull Request Count: {this.state.prCount}</h2>
			<div id="prsSample">
				<h4>Sample PRs (first 100 results)</h4>
				{/* <PRsContainer /> */}
				<div id="prsContainer">
					{this.state.prs.map(pr => {return (
					<div id="singlePR" key={pr.id}>
						<b>{pr.title}</b>
						<br />
						Created at: {pr.created_at.substring(0,10)}
						<br />
						<i>- {pr.user.login}</i>
						<p/>
					</div>
					)})}
				</div>
			</div>
		</div>

	)
	}
}

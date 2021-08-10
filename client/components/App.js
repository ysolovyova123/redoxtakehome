import React from "react"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 0,
			prState: '',
			prCount: '',
			prsSample: [],
			fullPrs: [],
			prevPrStateQueried: null
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

	async getResults(prState, page = 0) {
		let url
		if (prState === '') {
				url = `https://api.github.com/search/issues?q=org:ramda+is:pr&per_page=100&page=${page + 1}`
		}
		else {
				url = `https://api.github.com/search/issues?q=org:ramda+is:pr+state:${this.state.prState}&per_page=100&page=${page + 1}`
		}
		let response = await fetch(url,{
			headers: {
					'Authorization': 'token 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'
			}
		})
		let results = await response.json()
		// if it's the first page of results (current page is 0), set total count and sample of first 100 results in the state
		if (page === 0) {
			this.setState({
				prCount: results.total_count,
				prsSample: results.items
			})
		}
		// if you are switching between PR states (open -> closed), clear the array storing ALL the PRs with that state
		if (this.state.prevPrStateQueried !== null && prState !== this.state.prevPrStateQueried) {
			this.setState({
				fullPrs: []
			})
		}
		// update prevPrStateQueried to what you have selected (e.g. only open PRs)
		this.setState({
			prevPrStateQueried: prState
		})
		// because the API only shows you 100 results max per page, add those results to your full array and keep going (new page)
		for (let i=0; i<results.items.length; i++) {
			this.state.fullPrs.push(results.items[i])
		}
		page++
		// the GitHub Search API provides up to 1,000 results for each search, hence needing to stop once we hit 10 pages of 100 results each (meaning we have stored 1,000 results)
		// Source for API limitation: https://docs.github.com/en/rest/reference/search
		if (Math.ceil(this.state.prCount / 100) <= page || page === 10) return
		// if this limit has not been hit, keep going through remaining pages and store those results
		this.getResults(prState, page)
	}

	async generateCount (e) {
		e.preventDefault()
		let {prState} = this.state
		await this.getResults(prState)
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
				<div id="prsContainer">
					{this.state.prsSample.map(pr => {return (
					<div id="singlePR" key={pr.id}>
						<a href= {pr.pull_request.html_url}>{pr.title}</a>
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

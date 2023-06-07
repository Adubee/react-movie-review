import { Component } from "react";
import { v4 as uuidV4 } from "uuid";

class MovieReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			count: 0,
		};
	}

	componentDidMount() {
		const API_URL = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?offset=0&api-key=d5dU7lXY6MsVa83qHrKmycwI7P1Uv1sk`;
		fetch(API_URL)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({ data: data, loaded: true });
			})
			.catch((error) => {
				console.log(error);
			});
	}
//Additional functionality I wanted to add, feel free to try it out yourself
	// componentDidUpdate(prevProps, prevState) {
	// console.log(prevState);
	// console.log(this.state);
	// if(prevState.count == this.state.count){
	//   console.log("Same")
	// } else{
	//   console.log('different');
	// }
	// 	if (
	// 		JSON.stringify(prevState.API_URL) !== JSON.stringify(this.state.API_URL)
	// 	) {
	// 		const API_URL = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?offset=${this.state.count}&api-key=d5dU7lXY6MsVa83qHrKmycwI7P1Uv1sk`;
	// 		fetch(API_URL)
	// 			.then((response) => {
	// 				return response.json();
	// 			})
	// 			.then((data) => {
	// 				this.setState({ data: data, loaded: true });
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 	} else {
	// 		null;
	// 	}
	// }

	render() {
		let data;
		if (this.state.loaded) {
			data = this.state.data.results.map(
				({
					display_title,
					byline,
					critics_pick,
					headline,
					summary_short,
					multimedia: { src },
				}) => {
					let criticValue;
					if (critics_pick) {
						criticValue = "checked.png";
					} else {
						criticValue = "crossed.png";
					}
					return (
						<div key={uuidV4()} className="courszes-container">
							<div className="course">
								<div className="course-preview">
									<img src={src} alt="hi " />
								</div>
								<div className="course-info">
									<div className="progress-container">
										<h5>{byline}</h5>
									</div>
									<h1>{display_title}</h1>
									<h3>{headline}</h3>
									<h5>{summary_short}</h5>
									<div className="criticReview">
										<img src={criticValue} alt="" />
									</div>
								</div>
							</div>
						</div>
					);
				}
			);
		}
		console.log(this.state);
		return (
			<>
				<>{data}</>
				<button
					className="btn btn-container"
					onClick={() => this.setState({ count: this.state.count + 20 })}
				>
					More Movie Reviews
				</button>
			</>
		);
	}
}

export default MovieReview;

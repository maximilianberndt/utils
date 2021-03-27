import { map } from "../Math/map"
import { sniffBrowser } from "./sniff-browser"

export const getPerformance = () => {
	let performance = 0;

	const getPerfs = () => {
		let array = []
		const start = (window.performance || Date).now()
		for (let i = 0; i < 20000; i++) {
			array = Math.pow(Math.sin(Math.random()), 2)
		}
		const end = (window.performance || Date).now()
		return end - start
	}

	if (!sniffBrowser().isInternetExplorer) performance = map((getPerfs(), 0, 22, 3, 0))

	return Math.round(performance)
}
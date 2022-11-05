function getTitleLocaleDate(date: Date) {
	return date.toLocaleString('en-EN', {
		weekday: 'long', month: 'long', year: 'numeric', day: 'numeric',
	});
}

export default getTitleLocaleDate;
const searchForm = document.querySelector(".js-search");

function goToSearch(event){
	const searchInput = searchForm.querySelector("input"),
		keyword = searchInput.value;
		url = `https://www.google.com/search?q=${keyword}`;
    event.preventDefault();
	window.location.href = url;
}
searchForm.addEventListener('submit',goToSearch);
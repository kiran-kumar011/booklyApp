//storing all the variables and also selecting particular elements.
var def = [{bookName: 'Thinking fast and slow', bookStatus: false, hideList: false},
{bookName: 'The monk who sold his ferrari', bookStatus: false, hideList: false},
{bookName: 'Animal farm', bookStatus: true, hideList: false}];
var allBookList = JSON.parse(localStorage.getItem('bookly')) || def;
var inputAdd = document.querySelector('.addBook');
var clickAdd = document.querySelector('.addList');
var ul = document.querySelector('ul');
var read = document.querySelector('.read');
var hideButton = document.querySelector('.hideButton');
var displayAll = document.querySelector('.displayAll');
var searchBox = document.querySelector('.searchBox');


//for storing all the book name in an array as object elements.
function storingBooks(e){
	if(inputAdd.value.trim()){
		var newBook = {
			bookName : inputAdd.value,
			bookStatus: false,
			hideList: false
		};
		allBookList.push(newBook);
		inputAdd.value = '';
		displayBookList(allBookList);
	}
}
//checked true function to make the bookStatus true if checked.
function checkedTrue(e){
	var checkId = e.target.dataset.check;
	allBookList[checkId].bookStatus = !allBookList[checkId].bookStatus;
	displayBookList(allBookList);
}

//to remove stored list from the main data
function removeList(ee){
	var remove = ee.target.dataset.delt;
	allBookList.splice(remove , 1);
	displayBookList(allBookList);
} 

//function to add on pressing Enter button.
function handleEnter(enter){
	if(enter.keyCode === 13){
		storingBooks();
	}
}

//functions for displaying the readList.
function favouriteBooks(e){
	var show = allBookList.filter(value => value.bookStatus === true);	
	displayBookList(show);
}

//function for hiding all the books on click.
function hideAll(e){
	var hide = allBookList.every(value => value.hideList);
	if(hide){
	allBookList.forEach(value => {
		ul.style.display = 'block';
		value.hideList = false;
	});
} else {
	allBookList.forEach(value => {
		ul.style.display = 'none';
		value.hideList = true;
	});
}
displayBookList(allBookList)
}

// function to search the book from the list.
function searchBook(e) {
	var search = 	allBookList.filter(value => value.bookName.toLowerCase().includes(searchBox.value.toLowerCase()));
		displayBookList(search);
}

//function for displaying the list
function displayBookList(lists){
	localStorage.setItem('bookly',JSON.stringify(allBookList));
	if(lists){
		ul.innerHTML = '';
		lists.forEach((value, index) => {
			var list = document.createElement('li');
			var checkBox = document.createElement('input');
			checkBox.classList.add('spacing');
			checkBox.type = 'checkbox';
			checkBox.setAttribute('data-check', index);
			if(value.bookStatus){
				checkBox.setAttribute('checked', true);
			}
			var del = document.createElement('p');
			del.innerText = 'Delete';
			del.setAttribute('data-delt', index);
			var span = document.createElement('span');
			span.textContent = value.bookName;
			list.appendChild(checkBox);
			list.appendChild(span);
			list.appendChild(del);
			ul.appendChild(list);
			//event listener for checkox status
			checkBox.addEventListener('click', checkedTrue);
			//event listener for removing the book
			del.addEventListener('click', removeList);
	});}
}

displayBookList(allBookList);

//event listener for searching the books and displaying the.
searchBox.addEventListener('keyup', searchBook);
//event listener for showing all the lists
displayAll.addEventListener('click', () => {
	hideButton.classList.remove('border');
	read.classList.remove('border');
	displayAll.classList.add('border');
	displayBookList(allBookList)
});

//event listener for hiding all the book list.
hideButton.addEventListener('click', () => {
	read.classList.remove('border');
	displayAll.classList.remove('border');
	hideButton.classList.add('border');
	hideAll()});
//event listener for displaying the 'checked' books.
read.addEventListener('click', () => {
	hideButton.classList.remove('border');
	displayAll.classList.remove('border');
	read.classList.add('border');
	favouriteBooks()});
//event listener for enter.
document.addEventListener('keydown', handleEnter);
//event listener for clickbutton.
// clickAdd.addEventListener('click', storingBooks);
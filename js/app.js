const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    // display no phone found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none')
    }
    // display all phones
    phones.forEach(phone => {
        // console.log(phone);
        const { brand, phone_name, image, slug } = phone;
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src=${image} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">${slug}</p>
                <button onclick="loadPhoneDetail('${slug}')" href="#" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    });
    // stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = ``;
}
// handle search button click
document.getElementById('btn-search').addEventListener('click', () => {
    // start loader
    processSearch(10);
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to show all data
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch();
});

const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

// loadPhones();
const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data);
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    // display 20 phones only
    phones = phones.slice(0, 20);
    phones.forEach(phone => {
        console.log(phone);
        const { brand, phone_name, image, slug } = phone;
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
        <div class="card h-100 p-4">
        <img src=${image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">${slug}</p>
            </div>
      </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    })
} 

document.getElementById('btn-search').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = ``;
})

loadPhones('');
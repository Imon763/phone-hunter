const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  // display 10 phones only
  const showAll = document.getElementById('show-all');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
  }
  // display no phones
  const noPhone = document.getElementById('no-found-message');
  if (phones.length === 0) {
    noPhone.classList.remove('d-none');
  }
  else {
    noPhone.classList.add('d-none');
  }
  // displly all phones
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="laodPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
      </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop spinner or loader
  toggleSpinner(false);

}

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
  // start loader
  processSearch(10);
});

// searach input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
  }
});

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none');
  }
}


// not the best way to load all
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
})

const laodPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText =phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
  `
}

loadPhones('apple');



/* >>=====================================FULL MODULE SUMMARY =========================================>> */
/*
FETCH 
1. Fetch must provide url
dynamic or static
2. how to convert fetch promise return to json
3. how to convert json to data 
4. [cool headed]:
users:
--> array of objects
--> object with property users
---> object with a property called data

nested object


---------------
DOM manipulation
1. get something from the DOM
2. create element to append to the DOM
3. dynamically load data based on id


-----------
array --> forEach, map, find, filter

---------------
template string


 */
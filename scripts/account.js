function getUsers() {
  fetch('https://fakestoreapi.com/users')
            .then(apiUsers => apiUsers.json())
            .then(usersArray => {
              localStorage.setItem('users', JSON.stringify(usersArray));

            const usersContainer = document.querySelector ('.js-users-container');

            usersArray.forEach(usersObject => {
              const usersElement = document.createElement('div');
              usersElement.classList.add('user');

              usersElement
                .innerHTML =`
                <img src="logo/astronaut1.jpg">
                <p class="user-name">Name: ${usersObject.name.firstname} ${usersObject.name.lastname}</p>
                <p class="user-phone">Contact no: ${usersObject.phone} </p>
                <p class="user-email">Email: ${usersObject.email}</p>
                <p class="user-password">Password: ${usersObject.password}</p>
                <p class="user-address-title"> Address: </p>
                <div class="user-address-body">
                  <p class="line1">${usersObject.address.number} ${usersObject.address.street}</p>
               <p class="line2">${usersObject.address.city} </p>
               <p class="line3">${usersObject.address.zipcode} </p>
                </div>
                `;
                usersContainer.appendChild(usersElement);
              });
            })
}

getUsers();

//<---------------Same functionality as index.js---------------> //
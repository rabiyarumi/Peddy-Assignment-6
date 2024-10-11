let allPets = [];
let activeCategory = "";

//fetch and load catagories
const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.categories))
    .catch((error) => console.log(error));
};

// fetch and load all pets
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      allPets = data.pets;
      displayAllPets(allPets);
    })
    .catch((error) => console.log(error));
};

//remove active btn
const remoeveActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active-btn");
  }
};

//load pets by category
const loadCategory = (category) => {
  activeCategory = category;

  const loader = document.getElementById("loader");
  const petsContainer = document.getElementById("pets-container");
  const activeBtn = document.getElementById(`btn-${category}`);

  //remove active class first
  remoeveActiveClass();

  //give the active class
  activeBtn.classList.add("active-btn");

  petsContainer.classList.add("hidden");
  loader.classList.remove("hidden");

  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      // .then((data) => console.log(data.data))
      .then((data) => {
        loader.classList.add("hidden");
        petsContainer.classList.remove("hidden");
        displayAllPets(data.data);
      })

      .catch((error) => console.log(error));
  }, 2000);
};

//Load image function
const loadImage = (petImage) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      data.pets.forEach((item) => {
        if (item.image === petImage) {
          displayLikedImage(item.image);
        }
      });
    })
    .catch((error) => console.log(error));
};

//Pet detailes
const loadPetDetailes = async (petId) => {
  console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayPetDetailes(data.petData);
};

//desplay pet detailes
const displayPetDetailes = (pet) => {
  console.log(pet);
  const detailContainer = document.getElementById("modal-content");

  //add the inner html to modal
  detailContainer.innerHTML = `
 <!-- Image -->
    <div>
       <img
        class="w-full rounded-lg"
        src="${pet.image}"/>
    </div>


    <div>

        <h2 class="text-[#131313] text-xl     font-bold">${pet.pet_name}</h2>


      <div class=" space-y-1 border-b-[1px] pb-4 grid grid-cols-2">

       <!-- Bread -->
        <div class="text-[#131313] opacity-70 flex items-center gap-2">
            <img 
            class="h-5"
            src="https://img.icons8.com/?size=48&id=115221&format=png"> 
            <p>Breed: ${
              pet.breed?.length ? `<span>${pet.breed}</span>` : "Not available"
            }</p>
        </div>

        <!-- Birth -->
        <div class="text-[#131313] opacity-70 flex items-center gap-2">
        <img 
            class="h-5"
            src="https://img.icons8.com/?size=48&id=84997&format=png"> 
            <p>Birth: ${
              pet.date_of_birth?.length
                ? `<span> ${pet.date_of_birth}</span>`
                : "Not available"
            }</p>
        </div>


        <!-- Gender -->
         <div class="text-[#131313] opacity-70 flex items-center gap-2">
        <img 
            class="h-5"
            src="https://img.icons8.com/?size=96&id=pOnDG8syTe4X&format=png"> 
            <p>Gender: ${
              pet.gender?.length
                ? `<span> ${pet.gender}</span>`
                : "Not available"
            }</p>
        </div>

    
     <!-- Price -->
        <div class="text-[#131313] opacity-70 flex items-center gap-2"> 
        <img 
            class="h-5"
            src="https://img.icons8.com/?size=48&id=85843&format=png"> 
             <p>Price: ${
               pet.price != null
                 ? `<span> ${pet.price}</span>`
                 : "Not available"
             }</p>
        </div>

        <!-- vacconated status -->
         <div class="text-[#131313] opacity-70 flex items-center gap-2">
        <img 
            class="h-5"
            src="https://img.icons8.com/?size=96&id=pOnDG8syTe4X&format=png"> 
            <p>Vaccinated status:${
              pet.vaccinated_status !== null
                ? `<span>${pet.vaccinated_status}</span>`
                : "Not"
            }</p>
        </div>
       </div>

       <div class="space-y-1 pt-2"> 
            <h2 class="font-bold">Details Information</h2>
            <p class="p-2 text-[#131313] opacity-70">${pet.pet_details}</p>
       </div>
    </div>


    <div>
    </div>


  `;

  //there are 2 ways to show a modal
  //no.1
  // document.getElementById("modal").click();

  //no-2 from daisy ui
  document.getElementById("details_modal").showModal();
};

//Countdown Model
function opnCountdownModal(petId) {
  const modal = document.getElementById("my-modal");
  const adoptBtn = document.getElementById(`adopt-btn-${petId}`);
  const countdownDisplay = document.getElementById("countdown-display");

  let countdown = 3; //start countdown from 3

  modal.classList.add("modal-open"); //show the model
  countdownDisplay.textContent = countdown; //set the inner text of countdwn

  const intervalId = setInterval(() => {
    countdown--;
    countdownDisplay.textContent = countdown;
    //condition for stop countdown
    if (countdown <= 0) {
      clearInterval(intervalId); //stop countdown
      modal.classList.remove("modal-open"); //close modal
      adoptBtn.textContent = "Adopted"; //chang button text
      // adoptBtn.disabled = true; //disable the button
      adoptBtn.classList.add("btn-disabled");
    }
  }, 1000);
}

// //function to short pets by price
// const sortPetsByPrice = () => {
//   const sortedPets = allPets.sort((a, b) => b.price - a.price);

//   displayAllPets(sortedPets);
// };

// Sort pets by price in descending order
const sortPetsByPrice = () => {
  // Check if any category is active
  if (!activeCategory) {
    // If no category is selected, sort all pets
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => {
        const sortedPets = data.pets.sort((a, b) => b.price - a.price); // Sort by price
        displayAllPets(sortedPets); // Display sorted pets
      })
      .catch((error) => console.log(error));
  } else {
    // If a category is selected, sort pets of that category
    fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${activeCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        const sortedCategoryPets = data.data.sort((a, b) => b.price - a.price); // Sort by price
        displayAllPets(sortedCategoryPets); // Display sorted pets in the category
      })
      .catch((error) => console.log(error));
  }
};

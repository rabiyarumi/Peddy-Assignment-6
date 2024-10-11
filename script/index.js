console.log("index here");

//display catagories
const displayAllCategories = (catagories) => {
  // const {id, category, category_icon} = catagories;
  const categoryContainer = document.getElementById("category-container");
  // console.log(catagories)
  catagories.forEach((item) => {
    //creat button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button
        id="btn-${item.category}"
         onclick="loadCategory('${item.category}')"
        class=" flex gap-3  justify-center items-center
         primary-btn btn btn-lg  category-btn">
            <img class=" h-9 " src="${item.category_icon}" alt="">
            <p class="text-2xl font-bold">${item.category}</p>
        </button>
        
        `;

    //add button to container
    categoryContainer.appendChild(buttonContainer);
  });
};

//display all pets
const displayAllPets = (allPets) => {
  // console.log(allPets)
  // get the container
  const petsContainer = document.getElementById("pets-container");

  petsContainer.innerHTML = "";

  //condition for empty catagories
  if (allPets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
        <div class=" text-center lg:w-9/12 mx-auto space-y-4">
            <img
            class="mx-auto"
            src="./images/error.webp" />
            <h5 class="text-3xl font-bold">
                No Information Available
            </h5>
            <p class=" text-slate-400  ">
                Pet adoption gives animals a second chance at life by finding them
                loving homes. Save a life and   gain a loyal companion.
            </p>
        </div>
        `;
    return;
  } else {
    petsContainer.classList.add("grid");
  }

  allPets.forEach((pet) => {
    // console.log(pet)

    // creat pets card
    const cardContainer = document.createElement("div");
    cardContainer.classList = "border-[1px] p-5 rounded-xl";
    cardContainer.innerHTML = `
        <div>
   
       <div class="rounded-lg">
        <img class="h-full w-full object-cover rounded-lg" src="${
          pet.image
        }" alt="">
       </div>


    
       <div class=" space-y-1 border-b-[1px] pb-4">
       
        <h2 class="text-[#131313] text-xl font-bold">${pet.pet_name}</h2>

        <div class="text-[#131313] opacity-70 flex items-center gap-2">
            <img 
            class="h-5"
            src="https://img.icons8.com/?size=48&id=115221&format=png"> 
            <p>Breed: ${
              pet.breed?.length ? `<span>${pet.breed}</span>` : "Not available"
            }</p>
        </div>
        
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
       </div>
       

       
       <div class="flex flex-wrap gap-3  pt-4">

        <button 
        id="like"
        onclick="loadImage('${pet.image}')"
        class="sm-btn btn btn-sm ">
            <img
            class = " like-box h-6 text-slate-500 "
            src="https://img.icons8.com/?size=48&id=u8MTpAq972MG&format=png" />
        </button>

        <button 
        onclick="opnCountdownModal(${pet.petId})"
        id="adopt-btn-${pet.petId}"
         class="sm-btn btn btn-sm w-fit">
          Adopot
         </button>
        
        <button 
        onclick="loadPetDetailes(${pet.petId})"
        class=" sm-btn btn btn-sm  ">
          Detailes
        </button>
       </div>
    </div>
        `;
    // like button function

    petsContainer.appendChild(cardContainer);
  });
};

// display the image
const displayLikedImage = (image) => {
  const likedContainer = document.getElementById("liked-container");
  likedContainer.classList.add();

  const likeBox = document.createElement("div");
  likeBox.classList.add("rounded-sm");
  likeBox.innerHTML = `
   
     <img class="rounded-md object-cover" src="${image}" />
  
 `;
  likedContainer.appendChild(likeBox);
};

loadAllCategories();
loadAllPets();

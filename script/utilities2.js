//fetch and load categories
const loadAllCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.categories))
    .catch((error) => console.log(error));
}

// fetch and load all pets
const loadAllPets = ()=> {
    // Show the loader before fetching data
    document.getElementById("loader").classList.remove("hidden");

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        displayAllPets(data.pets);
        // Hide the loader after pets are displayed
        document.getElementById("loader").classList.add("hidden");
    })
    .catch((error) => {
        console.log(error);
        // Hide the loader if there's an error
        document.getElementById("loader").classList.add("hidden");
    });
}

// Remove active button class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
}

// Load pets by category
const loadCategory = (category) => {
    // Show the loader immediately when the category button is clicked
    document.getElementById("loader").classList.remove("hidden");

    // Remove the "active" class from all buttons
    removeActiveClass();

    // Add "active" class to the selected category button
    const activeBtn = document.getElementById(`btn-${category}`);
    activeBtn.classList.add("active");

    // Fetch data for the selected category
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            // Check if the data received is correctly categorized
            const petsByCategory = data.pets || data.data; // Adjust this based on the API response format

            // Hide the loader after the data is fetched and loaded
            document.getElementById("loader").classList.add("hidden");

            // Display pets specific to the selected category
            displayAllPets(petsByCategory);
        })
        .catch((error) => {
            // Hide the loader in case of an error
            document.getElementById("loader").classList.add("hidden");
            console.log(error);
        });
};



// Display categories
const displayAllCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("p-3", "border", "rounded-2xl", "mx-auto", "border-primary", "btn", "btn-lg", "bg-transparent", "btn-box");
        buttonContainer.innerHTML = `
        <button
        id="btn-${item.category}"
        onclick="loadCategory('${item.category}')"
        class="flex gap-2 justify-center items-center px-6 category-btn">
            <img class="h-9" src="${item.category_icon}" alt="">
            <p class="text-2xl font-bold">${item.category}</p>
        </button>
        `;
        categoryContainer.appendChild(buttonContainer);
    });
}

// Display all pets
const displayAllPets = (allPets) => {
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = ""; // Clear the container

    // Condition for empty categories
    if (allPets.length === 0) {
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = `
        <div class="text-center lg:w-9/12 mx-auto space-y-4">
            <img class="mx-auto" src="./images/error.webp" />
            <h5 class="text-3xl font-bold">No Information Available</h5>
            <p class="text-slate-400">Pet adoption gives animals a second chance at life by finding them loving homes. Save a life and gain a loyal companion.</p>
        </div>
        `;
        return;
    } else {
        petsContainer.classList.add("grid");
    }

    allPets.forEach((pet) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList = "border-[1px] p-5 rounded-xl";
        cardContainer.innerHTML = `
        <div>
            <div class="rounded-lg">
                <img class="h-full w-full object-cover rounded-lg" src="${pet.image}" alt="">
            </div>
            <div class="space-y-1 border-b-[1px] pb-4">
                <h2 class="text-[#131313] text-xl font-bold">${pet.pet_name}</h2>
                <div class="text-[#131313] opacity-70 flex items-center gap-2">
                    <img class="h-5" src="https://img.icons8.com/?size=48&id=115221&format=png"> 
                    <p>Breed: ${pet.breed?.length ? `<span>${pet.breed}</span>` : ""}</p>
                </div>
                <div class="text-[#131313] opacity-70 flex items-center gap-2">
                    <img class="h-5" src="https://img.icons8.com/?size=48&id=84997&format=png"> 
                    <p>Birth: ${pet.date_of_birth?.length ? `<span> ${pet.date_of_birth}</span>` : ""}</p>
                </div>
                <div class="text-[#131313] opacity-70 flex items-center gap-2">
                    <img class="h-5" src="https://img.icons8.com/?size=96&id=pOnDG8syTe4X&format=png"> 
                    <p>Gender: ${pet.gender?.length ? `<span> ${pet.gender}</span>` : ""}</p>
                </div>
                <div class="text-[#131313] opacity-70 flex items-center gap-2"> 
                    <img class="h-5" src="https://img.icons8.com/?size=48&id=85843&format=png"> 
                    <p>Price: ${pet.price != null ? `<span> ${pet.price}</span>` : ""}</p>
                </div>
            </div>
            <div class="flex flex-wrap gap-3 pt-4">
                <button class="border-[1px] border-[#0E7A8126] rounded-lg px-5 py-1 btn bg-transparent">
                    <img class="h-6 text-slate-500" src="https://img.icons8.com/?size=48&id=u8MTpAq972MG&format=png" />
                </button>
                <button class="border-[1px] border-[#0E7A8126] rounded-lg px-5 py-1 text-[#0E7A81] text-lg font-bold">adopt</button>
                <button class="border-[1px] border-[#0E7A8126] rounded-lg px-5 py-1 text-[#0E7A81] text-lg font-bold">details</button>
            </div>
        </div>
        `;
        petsContainer.appendChild(cardContainer);
    });
}

// Initial load of categories and pets
loadAllCategories();
loadAllPets();

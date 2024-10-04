// get time string
function getTimeString (time){

    const hours = Math.floor(time / 3600);
    const reminingSeconds = time % 3600;
    const minutes = Math.floor(reminingSeconds / 60);
    const seconds = reminingSeconds % 60;
    return `${hours} hour ${minutes} minutes ${seconds} seconds ago`;
}


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => {
            displayCategories(data.categories);
        })
        .catch(err => console.log(err));
};


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);
        // create a btn 
        const buttonContainer = document.createElement('div');
       buttonContainer.innerHTML = 
       `<button id="btn-${item.category_id}" class ="btn category-btn" onclick= "loadCategoriesVideos(${item.category_id})">
       ${item.category}
       </button>`;
       
        // add btn to container
        categoryContainer.append(buttonContainer);
    });
};


const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            displayVideos(data.videos);
        })
        .catch(err => console.log(err));
};

const loadCategoriesVideos = (id) => {
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // remove active class from all buttons
            const allBtns = document.querySelectorAll('.category-btn');
            allBtns.forEach(btn => btn.classList.remove('active'));
            // add active class to the clicked button
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');
            displayVideos(data.category);
        })
        .catch(err => console.log(err));
};

const loadDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
}

const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById('modal-content');
    // way 1 to show modal 
    // document.getElementById('showModalData').click();
    // way 2 to show modal
    document.getElementById('customModal').showModal();
    detailsContainer.innerHTML = `
        <img src ="${video.thumbnail}">
        <p> ${video.description}</p>
        `
};


const cardDemo = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
};


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos-container');
    videoContainer.innerHTML = '';
    if(videos.length == 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class ="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center"> 
            <img src ="assets/Icon.png">
            <h2 class="text-2xl font-bold text-red-500">No Videos Found in this category</h2>
            </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }
    videos.forEach((video) => {
        console.log(video);
        // create a card
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                class="w-full h-full object-cover"
                src="${video.thumbnail}"
                alt="" />
                ${
                    video.others.posted_date?.length == 0 ? '' : 
                    `<span class="absolute text-xs right-2 bottom-2 bg-black rounded text-white">
                    ${getTimeString(video.others.posted_date)}</span>`
                }
                
            </figure>
            <div class="px-0 py-2 flex gap-2">
               <div>
                    <img class="w-10 h-10 rounded-full object-cover"
                     src="${video.authors[0].profile_picture}" alt="  ">
                    
                </div>
                <div>
                    <h2 class="font-bold">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p class="text-gray-400">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">' : ''}
                        
                    </div>
                    <p></p>
                </div>

                <div>
                <p>
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-primary">details</button>
                </p>
                </div>
                
            </div>` ;

        // add card to container
        videoContainer.append(card);
    })
};


document.getElementById("search-input").addEventListener("keyup", function(event) {
loadVideos(event.target.value);
}

);
loadCategories();
loadVideos();





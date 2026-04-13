// This stores all the activities based on mood
const moodData = {
    happy: [
        { title: "Host a Mini Picnic", desc: "Grab a blanket and your favorite snack for some fresh air.", img:"https://plus.unsplash.com/premium_photo-1686593546445-e9655e1eaea5?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Create a High-Vibe Playlist", desc: "Curate 10 songs that make you feel unstoppable.", img: "https://images.unsplash.com/photo-1741719409289-9e04bfda9887?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Call a Good Friend", desc: "Share your positive energy with someone you care about.", img: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=400" }
    ],
    tired: [
        { title: "10-Minute Mindful Walk", desc: "Step away from screens and breathe to reset your levels.", img: "https://plus.unsplash.com/premium_photo-1682090420277-0d7ba9e03e23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Guided Body Scan", desc: "Find a quiet spot and release tension from head to toe.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" },
        { title: "Herbal Tea Ritual", desc: "Focus entirely on the warmth and scent of your favorite brew.", img: "https://images.unsplash.com/photo-1504382103100-db7e92322d39?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ],
    bored: [
        { title: "Sketch a Daily Object", desc: "Find something on your desk and draw it in 5 minutes.", img: "https://images.unsplash.com/photo-1581464668854-0da56c32393c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Learn a New Card Trick", desc: "Master a simple sleight of hand to impress your friends.", img: "https://plus.unsplash.com/premium_photo-1671683370315-87306b0faf90?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Start a Micro-Garden", desc: "Plant a few seeds or propagate a succulent clipping.", img: "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  }
    ],
    stressed: [
        { title: "Brain Dump Journaling", desc: "Write every worry down for 5 minutes, then close the book.", img: "https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "4-7-8 Breathing Exercise", desc: "Inhale for 4, hold for 7, exhale for 8.", img: "https://images.unsplash.com/photo-1518708909080-704599b19972?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Low-Light Stretch", desc: "Dim the lights and focus on gentle movement for your body.", img: "https://images.unsplash.com/photo-1552196527-bffef41ef674?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ]
};

// Load saved history and favorites from localStorage 
let historyArr = JSON.parse(localStorage.getItem('history')) || [];
let favsArr = JSON.parse(localStorage.getItem('favs')) || [];

// Keeps track of current state
let currentRec = null; 
let lastSelectedMood = null; 
let moodIndex = 0; 

// Get navigation and page elements
const navPulse = document.getElementById('nav-pulse');
const navFavs = document.getElementById('nav-favs');
const homePage = document.getElementById('home-page');
const favsPage = document.getElementById('favorites-page');

// Updates the UI with the selected activity
function updateUI(activity) {
    document.getElementById('rec-title').innerText = activity.title;
    document.getElementById('rec-desc').innerText = activity.desc;
    document.getElementById('rec-img').src = activity.img;
    document.getElementById('rec-container').classList.remove('hidden');
}

// Handles when a mood is selected
function handleMoodSelection(mood) {
    lastSelectedMood = mood;
    const options = moodData[mood];
    
    // Pick activity based on index
    currentRec = options[moodIndex];

    updateUI(currentRec);
    addToHistory(mood, currentRec.title);
}

// Add click listeners to all mood buttons
document.querySelectorAll('.mood-card').forEach(btn => {
    btn.addEventListener('click', () => {
        moodIndex = 0; // reset to first option
        handleMoodSelection(btn.dataset.mood);
    });
});

// Button to cycle through other suggestions
document.getElementById('try-another-btn').addEventListener('click', () => {
    if (lastSelectedMood) {
        moodIndex++;
        if (moodIndex >= 3) {
            moodIndex = 0; // loop back to start
        }
        handleMoodSelection(lastSelectedMood);
    }
});

// Save current activity to favorites
document.getElementById('save-btn').addEventListener('click', () => {
    if (currentRec) {
        const exists = favsArr.some(f => f.title === currentRec.title);
        if (!exists) {
            favsArr.push(currentRec);
            localStorage.setItem('favs', JSON.stringify(favsArr));
            alert("Activity saved!");
        }
    }
});

// Switch to favorites page
navFavs.addEventListener('click', () => {
    homePage.classList.add('hidden');
    favsPage.classList.remove('hidden');
    navFavs.classList.add('text-teal-600', 'border-b-2', 'border-teal-600');
    navPulse.classList.remove('text-teal-600', 'border-b-2', 'border-teal-600');
    renderFavorites();
});

// Switch back to home page
navPulse.addEventListener('click', () => {
    favsPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    navPulse.classList.add('text-teal-600', 'border-b-2', 'border-teal-600');
    navFavs.classList.remove('text-teal-600', 'border-b-2', 'border-teal-600');
});

// Add a new item to history
function addToHistory(mood, title) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    historyArr.unshift({ mood, title, time });

   
    while (historyArr.length > 3) {
        historyArr.pop();
    }

    localStorage.setItem('history', JSON.stringify(historyArr));
    renderHistory();
}

// Render history list on screen
function renderHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = ""; 

    historyArr.forEach(item => {
        list.innerHTML += `
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">🍃</div>
                    <div>
                        <h4 class="font-bold text-slate-800">${item.title}</h4>
                        <p class="text-xs text-slate-400 italic">Feeling ${item.mood}</p>
                    </div>
                </div>
                <div class="text-right text-[10px] font-bold text-slate-400 uppercase leading-tight">
                    Today <br> ${item.time}
                </div>
            </div>`;
    });
}

// Render saved favorite activities
function renderFavorites() {
    const grid = document.getElementById('favs-grid');

    // Show message if no favorites
    grid.innerHTML = favsArr.length ? "" : "<p class='text-slate-400'>No favorites yet.</p>";

    favsArr.forEach(item => {
        grid.innerHTML += `
            <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50">
                <img src="${item.img}" class="h-48 w-full object-cover">
                <div class="p-6">
                    <h3 class="font-bold text-xl mb-2">${item.title}</h3>
                    <p class="text-sm text-slate-500">${item.desc}</p>
                </div>
            </div>`;
    });
}

// hide current recommendation
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('rec-container').classList.add('hidden');
});

// Load history on page load
renderHistory();
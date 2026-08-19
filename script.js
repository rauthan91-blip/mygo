// GitHub की जानकारी बाद में यहाँ भरेंगे
const GITHUB_USERNAME = "rauthan91-blip";
const REPOSITORY_NAME = "mygo";
const GO_FOLDER = "GO";

const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");

let allGOs = [];

// GitHub से GO files पढ़ना
async function loadGOs() {

    try {

        const apiURL =
            https://api.github.com/repos/${GITHUB_USERNAME}/${REPOSITORY_NAME}/contents/${GO_FOLDER};

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("GitHub folder नहीं मिला");
        }

        const files = await response.json();

        allGOs = files.filter(file =>
            file.type === "file" &&
            file.name.toLowerCase().endsWith(".pdf")
        );

        displayGOs(allGOs);

    } catch (error) {

        goList.innerHTML = `
            <p class="loading">
                GO अभी load नहीं हो पाए।
            </p>
        `;

        console.error(error);
    }
}


// GO को portal पर दिखाना
function displayGOs(files) {

    if (files.length === 0) {

        goList.innerHTML = `
            <p class="loading">
                कोई GO उपलब्ध नहीं है।
            </p>
        `;

        return;
    }

    goList.innerHTML = "";

    files.forEach(file => {

        const card = document.createElement("div");

        card.className = "go-card";

        card.innerHTML = `
            <div class="go-name">
                ${file.name.replace(".pdf", "")}
            </div>

            <div class="buttons">

                <a 
                    href="${file.download_url}" 
                    target="_blank"
                    class="view-btn">
                    👁️ View
                </a>

                <a 
                    href="${file.download_url}" 
                    download
                    class="download-btn">
                    ⬇️ Download
                </a>

            </div>
        `;

        goList.appendChild(card);

    });
}


// Search
searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filteredGOs = allGOs.filter(file =>
        file.name.toLowerCase().includes(searchText)
    );

    displayGOs(filteredGOs);

});


// GO load करें
loadGOs();
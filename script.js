const GITHUB_USERNAME = "rauthan91-blip";
const REPOSITORY_NAME = "mygo";
const GO_FOLDER = "GO";

const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");

let allGOs = [];

async function loadGOs() {

    try {

        const apiURL =
            https://api.github.com/repos/${GITHUB_USERNAME}/${REPOSITORY_NAME}/contents/${GO_FOLDER};

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("GO folder नहीं मिला");
        }

        const files = await response.json();

        allGOs = files.filter(file =>
            file.type === "file" &&
            file.name.toLowerCase().endsWith(".pdf")
        );

        displayGOs(allGOs);

    } catch (error) {

        console.error(error);

        goList.innerHTML = `
            <p class="loading">
                GO load नहीं हो पाए।
            </p>
        `;
    }
}


function displayGOs(files) {

    if (files.length === 0) {

        goList.innerHTML = `
            <p class="loading">
                कोई PDF नहीं मिली।
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
                ${file.name.replace(/\.pdf$/i, "")}
            </div>

            <div class="buttons">

                <a 
                    href="${file.html_url}"
                    target="_blank"
                    class="view-btn">
                    👁️ View
                </a>

                <a 
                    href="${file.download_url}"
                    class="download-btn"
                    download>
                    ⬇️ Download
                </a>

            </div>
        `;

        goList.appendChild(card);
    });
}


searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filteredGOs = allGOs.filter(file =>
        file.name.toLowerCase().includes(searchText)
    );

    displayGOs(filteredGOs);
});


loadGOs();
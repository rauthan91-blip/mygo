alert("JavaScript chal raha hai");

const GITHUB_USERNAME = "rauthan91-blip";
const REPOSITORY_NAME = "mygo";
const GO_FOLDER = "GO";
const BRANCH = "main";

const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");

let allGOs = [];


// ===============================
// GitHub से GO PDF Load करना
// ===============================

async function loadGOs() {

    try {

        const apiURL =
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPOSITORY_NAME}/contents/${GO_FOLDER}?ref=${BRANCH}`;

        console.log("GitHub API URL:", apiURL);

        const response = await fetch(apiURL);

        if (!response.ok) {

            throw new Error(
                `GitHub Error: ${response.status}`
            );
        }

        const files = await response.json();

        console.log("GitHub Files:", files);

        // केवल PDF files
        allGOs = files.filter(file =>
            file.type === "file" &&
            file.name.toLowerCase().endsWith(".pdf")
        );

        displayGOs(allGOs);

    } catch (error) {

        console.error("Error:", error);

        goList.innerHTML = `
            <div class="error">
                <h3>GO load नहीं हो पाए</h3>
                <p>${error.message}</p>
                <p>
                    कृपया GitHub में <b>GO</b> folder और PDF files check करें।
                </p>
            </div>
        `;
    }
}


// ===============================
// GO को Portal पर दिखाना
// ===============================

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

    files.forEach((file, index) => {

        const card = document.createElement("div");

        card.className = "go-card";

        // .pdf हटाकर केवल नाम दिखाना
        const goName = file.name
            .replace(/\.pdf$/i, "");

        card.innerHTML = `

            <div class="go-name">

                <span class="number">
                    ${index + 1}.
                </span>

                📄 ${escapeHTML(goName)}

            </div>

            <div class="buttons">

                <a
                    href="${file.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="view-btn">
                    👁️ View
                </a>

                <a
                    href="${file.download_url}"
                    target="_blank"
                    class="download-btn">
                    ⬇️ Download
                </a>

            </div>

        `;

        goList.appendChild(card);

    });
}


// ===============================
// Search
// ===============================

searchInput.addEventListener("input", function () {

    const searchText =
        this.value.toLowerCase().trim();

    const filteredGOs = allGOs.filter(file =>

        file.name
            .toLowerCase()
            .includes(searchText)

    );

    displayGOs(filteredGOs);

});


// ===============================
// Security Function
// ===============================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ===============================
// Portal Start
// ===============================

loadGOs();

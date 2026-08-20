// ============================================
// GITHUB SETTINGS
// ============================================

const GITHUB_USERNAME = "rauthan91-blip";
const GITHUB_REPOSITORY = "mygo";
const GO_FOLDER = "GO";

// ============================================
// VARIABLES
// ============================================

let allGOs = [];


// ============================================
// LOAD GO FILES
// ============================================

async function loadGOs() {

    const loading = document.getElementById("loading");
    const goList = document.getElementById("goList");
    const noData = document.getElementById("noData");

    loading.style.display = "block";
    goList.innerHTML = "";
    noData.style.display = "none";

    try {

        const apiURL =
            `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/contents/${GO_FOLDER}`;

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("GitHub folder नहीं मिला");
        }

        const files = await response.json();

        allGOs = files
            .filter(file => file.type === "file")
            .filter(file => file.name.toLowerCase().endsWith(".pdf"))
            .map(file => {

                return {
                    name: removeExtension(file.name),
                    fileName: file.name,
                    url: file.html_url,
                    downloadUrl: file.download_url,
                    year: getYear(file.name)
                };

            });

        loading.style.display = "none";

        createYearFilter();

        displayGOs(allGOs);

    } catch (error) {

        loading.style.display = "none";

        goList.innerHTML = `
            <div class="no-data">
                <h3>GO Loading में समस्या</h3>
                <p>${error.message}</p>
                <br>
                <p>
                    कृपया GitHub Username, Repository और GO folder
                    की जाँच करें।
                </p>
            </div>
        `;
    }
}


// ============================================
// DISPLAY GO
// ============================================

function displayGOs(data) {

    const goList = document.getElementById("goList");
    const noData = document.getElementById("noData");
    const totalGO = document.getElementById("totalGO");

    goList.innerHTML = "";

    totalGO.textContent = data.length;

    if (data.length === 0) {

        noData.style.display = "block";

        return;
    }

    noData.style.display = "none";

    data.forEach(go => {

        const card = document.createElement("div");

        card.className = "go-card";

        card.innerHTML = `

            <div class="go-icon">
                📄
            </div>

            <div class="go-title">
                ${go.name}
            </div>

            <div class="go-date">
                वर्ष : ${go.year || "उपलब्ध नहीं"}
            </div>

            <div class="buttons">

                <a
                    href="${go.url}"
                    target="_blank"
                    class="view-btn"
                >
                    👁 View
                </a>

                <a
                    href="${go.downloadUrl}"
                    target="_blank"
                    class="download-btn"
                    download
                >
                    ⬇ Download
                </a>

            </div>
        `;

        goList.appendChild(card);

    });
}


// ============================================
// REMOVE PDF EXTENSION
// ============================================

function removeExtension(fileName) {

    return fileName.replace(/\.[^/.]+$/, "");

}


// ============================================
// YEAR FIND
// ============================================

function getYear(fileName) {

    const match = fileName.match(/20\d{2}/);

    if (match) {
        return match[0];
    }

    return "";

}


// ============================================
// CREATE YEAR FILTER
// ============================================

function createYearFilter() {

    const yearFilter = document.getElementById("yearFilter");

    yearFilter.innerHTML = `
        <option value="">सभी वर्ष</option>
    `;

    const years = [...new Set(
        allGOs
            .map(go => go.year)
            .filter(year => year !== "")
    )];

    years.sort((a, b) => b - a);

    years.forEach(year => {

        const option = document.createElement("option");

        option.value = year;

        option.textContent = year;

        yearFilter.appendChild(option);

    });

}


// ============================================
// SEARCH
// ============================================

document.getElementById("searchInput")
    .addEventListener("input", filterGOs);


document.getElementById("yearFilter")
    .addEventListener("change", filterGOs);


function filterGOs() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const year =
        document.getElementById("yearFilter")
        .value;

    const filtered = allGOs.filter(go => {

        const matchesSearch =
            go.name.toLowerCase().includes(search);

        const matchesYear =
            year === "" || go.year === year;

        return matchesSearch && matchesYear;

    });

    displayGOs(filtered);

}


// ============================================
// START
// ============================================

loadGOs();

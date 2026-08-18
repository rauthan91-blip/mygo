const goData = [

    {
        number: "GO-001",
        date: "18-08-2026",
        subject: "Scholarship संबंधी शासनादेश",
        pdf: "pdf/GO-001.pdf"
    },

    {
        number: "GO-002",
        date: "17-08-2026",
        subject: "Pension संबंधी शासनादेश",
        pdf: "pdf/GO-002.pdf"
    },

    {
        number: "GO-003",
        date: "16-08-2026",
        subject: "Education संबंधी शासनादेश",
        pdf: "pdf/GO-003.pdf"
    }

];


const goList = document.getElementById("goList");
const searchInput = document.getElementById("searchInput");


function displayGO(data) {

    goList.innerHTML = "";

    if (data.length === 0) {

        goList.innerHTML = "<p>कोई GO नहीं मिला।</p>";

        return;
    }


    data.forEach(go => {

        const card = document.createElement("div");

        card.className = "go-card";

        card.innerHTML = `

            <div class="go-info">

                <h3>${go.number}</h3>

                <p>
                    <strong>Date:</strong>
                    ${go.date}
                </p>

                <p>
                    <strong>Subject:</strong>
                    ${go.subject}
                </p>

            </div>


            <a 
                href="${go.pdf}" 
                target="_blank"
                class="view-btn"
            >
                View PDF
            </a>

        `;

        goList.appendChild(card);

    });

}


searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filteredGO = goData.filter(go =>

        go.number.toLowerCase().includes(searchText) ||

        go.subject.toLowerCase().includes(searchText)

    );

    displayGO(filteredGO);

});


displayGO(goData);
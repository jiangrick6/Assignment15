// Afford page data coming through JSON

document.addEventListener("DOMContentLoaded", function () {
  // Function to make AJAX request
  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "../json/afford.json", true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  // Function to handle JSON data and generate HTML elements
  function processData(jsonData) {
    const data = JSON.parse(jsonData);

    // Get the layout element where dynamic content will be appended
    const layoutElement = document.getElementById("layoutElement");

    // Loop through the JSON data and create HTML elements dynamically
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(item.mainClass, "wrap", "animate", "pop");

      const overlayDiv = document.createElement("div");
      overlayDiv.classList.add("overlay");

      const overlayContentDiv = document.createElement("div");
      overlayContentDiv.classList.add(
        "overlay-content",
        "animate",
        "slide-left",
        "delay-2"
      );

      const h1 = document.createElement("h1");
      h1.classList.add("animate", "slide-left", "pop", "delay-4");
      h1.textContent = item.h1;

      const items = item.items.map((subItem) => {
        const p = document.createElement("p");
        p.classList.add("animate", "slide-left", "pop", "delay-5");
        p.style.color = "white";
        p.style.marginBottom = "2.5rem";
        p.innerHTML = `Check for more <em>${subItem.em1}</em>`;
        return p;
      });

      overlayContentDiv.appendChild(h1);
      items.forEach((subItem) => overlayContentDiv.appendChild(subItem));

      const imageContentDiv = document.createElement("div");
      imageContentDiv.classList.add(
        "image-content",
        "animate",
        "slide",
        "delay-5"
      );

      const dotsDiv = document.createElement("div");
      dotsDiv.classList.add("dots", "animate");

      const dot1 = document.createElement("div");
      dot1.classList.add("dot", "animate", "slide-up", "delay-6");

      const dot2 = document.createElement("div");
      dot2.classList.add("dot", "animate", "slide-up", "delay-7");

      const dot3 = document.createElement("div");
      dot3.classList.add("dot", "animate", "slide-up", "delay-8");

      dotsDiv.appendChild(dot1);
      dotsDiv.appendChild(dot2);
      dotsDiv.appendChild(dot3);

      overlayDiv.appendChild(overlayContentDiv);
      overlayDiv.appendChild(imageContentDiv);
      overlayDiv.appendChild(dotsDiv);

      const textDiv = document.createElement("div");
      textDiv.classList.add("text");
      textDiv.innerHTML = `<p>${item.p}</p>`;

      const a = document.createElement("a");
      a.href = item.items[0].a;
      a.textContent = "Learn More";
      textDiv.appendChild(a);

      div.appendChild(overlayDiv);
      div.appendChild(textDiv);

      layoutElement?.appendChild(div);
    });
  }

  // Call the loadJSON function to fetch the JSON data
  loadJSON(processData);
});

// Events page

document
  .getElementById("event-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    var eventName = document.getElementById("eventName").value;
    var eventDate = document.getElementById("eventDate").value;
    var organizerName = document.getElementById("organizerName").value;
    var organizerEmail = document.getElementById("organizerEmail").value;

    // Simple form validation
    if (!eventName || !eventDate || !organizerName || !organizerEmail) {
      alert("Please fill in all fields");
      return;
    }

    // Check if table exists
    var eventTable = document.getElementById("event-table");
    if (!eventTable) {
      // Create table if it doesn't exist
      eventTable = document.createElement("table");
      eventTable.id = "event-table";

      // Table caption
      var caption = document.createElement("caption");
      caption.textContent = "Upcoming Events";
      eventTable.appendChild(caption);

      // Table header
      var thead = document.createElement("thead");
      thead.innerHTML = `
        <tr>
          <th scope="col">Event Name</th>
          <th scope="col">Event Date</th>
          <th scope="col">Manager Name</th>
          <th scope="col">Manager Email</th>
        </tr>
      `;
      eventTable?.appendChild(thead);

      // Table body
      var tbody = document.createElement("tbody");
      eventTable?.appendChild(tbody);

      // Append table to event details container
      var eventDetails = document.querySelector(".event-details");
      eventDetails?.appendChild(eventTable);
    }

    // Create new table row
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td data-label="event">${eventName}</td>
      <td data-label="Date">${eventDate}</td>
      <td data-label="organizer">${organizerName}</td>
      <td data-label="organizer email">${organizerEmail}</td>
    `;

    // Append new row to table body
    eventTable.querySelector("tbody")?.appendChild(newRow);

    // Reset form
    document.getElementById("event-form").reset();
  });

// Add event listener for form submission
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (event) {
    // Prevent form submission
    event.preventDefault();

    // Clear previous error messages
    clearErrors();

    // Validate form fields
    var isValid = true;

    // Validate Subject
    var subject = document.getElementById("subject").value;
    if (subject === "") {
      document.getElementById("subjectError").innerText =
        "Please select a subject.";
      isValid = false;
    }

    // Validate First Name
    var firstName = document.getElementById("firstName").value.trim();
    if (firstName === "") {
      document.getElementById("firstNameError").innerText =
        "Please enter your first name.";
      isValid = false;
    }

    // Validate Last Name
    var lastName = document.getElementById("lastName").value.trim();
    if (lastName === "") {
      document.getElementById("lastNameError").innerText =
        "Please enter your last name.";
      isValid = false;
    }

    // Validate Address
    var address = document.getElementById("Address").value.trim();
    if (address === "") {
      document.getElementById("addressError").innerText =
        "Please enter your address.";
      isValid = false;
    }

    // Validate Zip Code
    var zipCode = document.getElementById("ZipCode").value.trim();
    if (!zipCode.match(/^\d{5}$/)) {
      document.getElementById("zipCodeError").innerText =
        "Please enter a valid 5-digit zip code.";
      isValid = false;
    }

    // Validate City
    var city = document.getElementById("city").value.trim();
    if (city === "") {
      document.getElementById("cityError").innerText =
        "Please enter your city.";
      isValid = false;
    }

    // Validate State
    var state = document.getElementById("State").value.trim();
    if (state === "") {
      document.getElementById("stateError").innerText =
        "Please enter your state.";
      isValid = false;
    }

    // Validate Country
    var country = document.getElementById("Country").value.trim();
    if (country === "") {
      document.getElementById("countryError").innerText =
        "Please enter your country.";
      isValid = false;
    }

    // Validate Phone
    var phone = document.getElementById("phone").value.trim();
    if (!phone.match(/^\d{10}$/)) {
      document.getElementById("phoneError").innerText =
        "Please enter a valid phone number.";
      isValid = false;
    }

    // Validate Email
    var email = document.getElementById("email").value.trim();
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      document.getElementById("emailError").innerText =
        "Please enter a valid email address.";
      isValid = false;
    }

    // Validate Comments
    var comments = document.getElementById("Comments").value.trim();
    if (comments === "") {
      document.getElementById("commentsError").innerText =
        "Please enter your comments or requests.";
      isValid = false;
    }

    // If form is valid, submit it
    if (isValid) {
      // Submit the form
      this.submit();
    } else {
      // If form is not valid, alert user to check for errors
      checkErrors();
      var errors = document.querySelectorAll(".error");
      errors.forEach(function (error) {
        if (error.innerText !== "") {
          error.style.fontSize = "1.2rem";
          error.style.color = "rgba(219, 25, 25, 0.842)";
          error.style.fontWeight = "Bold";
          error.style.background = "rgba(255, 255, 255, 0.6)";
          error.style.padding = " 0.4em 1em";
          error.style.borderRadius = "8px";
        }
      });
    }
  });

function clearErrors() {
  var errors = document.querySelectorAll(".error");
  errors.forEach(function (error) {
    error.innerText = "";
    error.style.fontSize = "0";

    error.style.background = "transparent";
    error.style.padding = " 0";
  });
}

function checkErrors() {
  document.getElementById("checkErrors").innerText =
    "Please check for errors and try again.";
}

//Handling form data
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");

  // Function to make AJAX request
  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "/api/contact-data", true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  // Function to handle JSON data and generate HTML elements
// Function to handle JSON data and generate HTML elements
// Function to handle JSON data and generate HTML elements
function processData(jsonData) {
  const data = JSON.parse(jsonData);

  // Get the layout element where dynamic content will be appended
  const layoutElement = document.getElementById("no-more-tables");

  // Loop through the JSON data
  data.forEach(function (item, index) {
    // Create table element for each object
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = index + 1;
    table.appendChild(caption);

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headings = [
      "Subject",
      "First Name",
      "Last Name",
      "Address",
      "Zip Code",
      "City",
      "State",
      "Country",
      "Phone",
      "Email",
      "Comments",
    ];
    headings.forEach(function (heading) {
      const th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.textContent = heading;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    // Create table row for current object
    const bodyRow = document.createElement("tr");
    for (const key in item) {
      // Skip _id and __v fields
      if (key !== "_id" && key !== "__v") {
        const td = document.createElement("td");
        td.setAttribute("data-label", key.charAt(0).toUpperCase() + key.slice(1));
        td.textContent = item[key];
        bodyRow.appendChild(td);
      }
    }
    tbody.appendChild(bodyRow);
    table.appendChild(tbody);

    // Append the table to the layout element
    layoutElement.appendChild(table);
  });

  // Hide loader after data is loaded
  loader.style.display = "none";
}



  // Call the loadJSON function to fetch the JSON data
  loadJSON(processData);
});

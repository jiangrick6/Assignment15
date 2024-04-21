const express = require("express");
const path = require("path");
const http = require("http"); // Change to http module
const hbs = require("hbs");
const axios = require("axios"); // Import axios module

const Contact = require("./src/models/contact");

const app = express();
require("./src/db/conn");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
console.log("Templates Path:", templates_path);
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/attractions", (req, res) => {
  res.render("attractions");
});
app.get("/recreations", (req, res) => {
  res.render("recreations");
});
app.get("/history", (req, res) => {
  res.render("history");
});
app.get("/afford", (req, res) => {
  res.render("afford");
});
app.get("/dining", (req, res) => {
  res.render("dining");
});
app.get("/events", (req, res) => {
  res.render("events");
});
app.get("/things", (req, res) => {
  res.render("things");
});
app.get("/faq", (req, res) => {
  res.render("faq");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/plans", (req, res) => {
  res.render("plans");
});
app.get("/form-data", (req, res) => {
  res.render("form-data");
});

app.get("/success", (req, res) => {
  res.render("success"); // Render your success page template here
});

const server = require("http").createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port} using HTTP`);
});

// getting form data
app.post("/contact-data", async (req, res) => {
  try {
    console.log(req.body);
    // Create a new Contact document using data from the request body
    const newContact = new Contact({
      subject: req.body.subject,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      zipCode: req.body.zipCode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      comments: req.body.comments,
    });

    // Save the new contact document to the database
    await newContact.save();

    // Send email with contact data using FormSubmit API
    const formData = JSON.stringify({
      email: req.body.email,
      subject: "New Contact Form Submission",
      message: `New contact form submission:\n\n${JSON.stringify(
        req.body,
        null,
        2
      )}`,
    });
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://formsubmit.co/ajax/hashirakbar69@gmail.com", {
        name: "FormSubmit",
        message: formData,
      })
      .then((response) => {
        console.log(response.data); // Log the response from FormSubmit API
        // After sending email, redirect to success page
        res.redirect("/success");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
      });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Error saving contact" });
  }
});

// Route to get contact data
app.get("/api/contact-data", async (req, res) => {
  try {
    // Fetch contact data from the MongoDB collection
    const contacts = await Contact.find({});
    res.json(contacts); // Send the contact data as JSON response
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  comments: { type: String, required: true },
});
// Create model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

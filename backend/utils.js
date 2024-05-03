// utils.js

// Function to generate a unique job ID
const generateJobId = () => {
  return Math.random().toString(36).substr(2, 10); // Example implementation for generating random job ID
};

module.exports = {
  generateJobId,
};

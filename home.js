// Fetch and display quote on page load
document.addEventListener('DOMContentLoaded', function() {
  fetchRandomQuote();
  setupVoiceCommands();
});

// Function to fetch random quote from ZenQuotes API
async function fetchRandomQuote() {
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');
  
  // Show loading state
  quoteElement.textContent = "Loading an inspiring quote...";
  authorElement.textContent = "";

  try {
      const response = await fetch('https://zenquotes.io/api/random');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Update the quote and author elements
      quoteElement.textContent = `"${data[0].q}"`;
      authorElement.textContent = `— ${data[0].a}`;
  } catch (error) {
      console.error('Error fetching quote:', error);
      quoteElement.textContent = "The best preparation for tomorrow is doing your best today.";
      authorElement.textContent = "— H. Jackson Brown Jr.";
  }
}

// Voice command setup (existing functionality)
function setupVoiceCommands() {
  if (annyang) {
      const commands = {
          'navigate to *page': function(page) {
              // Your existing navigation code
          },
          'change the color to *color': function(color) {
              // Your existing color change code
          },
          'hello': function() {
              // Your existing hello response
          },
          'refresh quote': function() {
              fetchRandomQuote();
          }
      };
      
      annyang.addCommands(commands);
      
      document.getElementById('startListening').addEventListener('click', function() {
          annyang.start();
      });
      
      document.getElementById('stopListening').addEventListener('click', function() {
          annyang.abort();
      });
  }
}
async function updateGreetings() {
    try {
      const response = await fetch('/api/session');
      const data = await response.json();
  
      const titleElement = document.getElementById('greeting-h1'); // Replace 'title' with the id of your title element
  
      if (data.loggedIn) {
        titleElement.textContent = `Welcome ${data.username}!`;
      } else {
        titleElement.textContent = 'Hello guest! log in to create your own blogs!';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

updateGreetings();
document.addEventListener('DOMContentLoaded', async (event) => {
    try{
        const result = await fetch('/api/percentage');
    }
    catch(error){
        console.error('Error: ',error);
    }
  });
document.addEventListener('DOMContentLoaded', async (event) => {
    try{    
        const result = await fetch('/api/percentage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await result.json();
        const {percentageTime} = data;
        console.log(data);  
        document.getElementById('percentage').innerHTML = percentageTime;
    }
    catch(error){
        console.error('Error: ',error);
    }
});

fetch('footer.html')
.then(response => response.text())
.then(html => {
    document.getElementById('footerid').innerHTML = html;
});
/**
 * AVIS Live Caprica Date Fetcher
 * Queries the Caprica Miraheze Wiki API to fetch the current synchronized date
 */

document.addEventListener("DOMContentLoaded", () => {
    fetchCapricaDate();
});

async function fetchCapricaDate() {
    // Instead of live Lua parsing, fetch the cached Main_Page HTML so we perfectly match what users see on the wiki
    const url = "https://caprica.miraheze.org/w/api.php?action=parse&page=Main_Page&prop=text&format=json&origin=*";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.parse && data.parse.text && data.parse.text['*']) {
            const htmlString = data.parse.text['*'];
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            
            // The date is inside the text: '''Today is:''' ''March 20, 2058''
            // We can search for the text "Today is:" and extract the date next to it
            const contentText = tempDiv.textContent || tempDiv.innerText;
            const match = contentText.match(/Today is:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/);
            
            if (match && match[1]) {
                const cleanDateText = match[1].trim();
                
                // Find all elements looking for the live date and update them
                const dateContainers = document.querySelectorAll('.live-caprica-date');
                dateContainers.forEach(container => {
                    container.textContent = cleanDateText;
                    // Add a subtle fade-in animation or styling if needed
                    container.style.opacity = '1';
                });
                
                console.log("AVIS synchronized with Caprica Universe clock:", cleanDateText);
            }
        }
    } catch (error) {
        console.error("Failed to fetch Caprican Date from wiki API:", error);
        // Fallback or leave placeholder text if API is down
    }
}

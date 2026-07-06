/**
 * AVIS Live Caprica Date Fetcher
 * Queries the Caprica Miraheze Wiki API to fetch the current synchronized date
 */

document.addEventListener("DOMContentLoaded", () => {
    fetchCapricaDate();
});

async function fetchCapricaDate() {
    const url = "https://caprica.miraheze.org/w/api.php?action=parse&text=%7B%7B%23invoke%3ACapricaDate%7CfromDate%7D%7D&contentmodel=wikitext&format=json&origin=*";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.parse && data.parse.text && data.parse.text['*']) {
            // Extract the raw HTML returned by the parser
            const htmlString = data.parse.text['*'];
            
            // Create a temporary DOM element to parse the HTML and strip out tags/comments
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            
            // The actual date text is contained in the first <p> tag
            const dateParagraph = tempDiv.querySelector('p');
            
            if (dateParagraph) {
                const cleanDateText = dateParagraph.textContent.trim();
                
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

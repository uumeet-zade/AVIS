# AVIS Workspace Guidelines

> [!IMPORTANT]
> **CRITICAL INSTRUCTION:** Always have a full look at these instructions and the general context before proceeding with any tasks.

These are rules for all agents operating within the AVIS repository.

## Live Caprica Date
When updating or verifying the date on the website, you MUST use the Caprica Miraheze Wiki API to fetch the cached date from the Main Page. 
- The endpoint is: `https://caprica.miraheze.org/w/api.php?action=parse&page=Main_Page&prop=text&format=json&origin=*`
- Do **not** calculate the date locally using a script or the Excel calendar calculator.
- Do **not** evaluate the Lua module dynamically (e.g., using `text={{#invoke:CapricaDate|fromDate}}`).
- The website MUST match the exact text found next to "Today is:" on the Wiki's cached `Main_Page` so that it synchronizes with the Wiki's caching cycle.

## News Categories
AVIS is operated by a single person and only covers three specific categories of news. When creating, tagging, or organizing articles, you must ONLY use the following 3 categories:
1. **News:** The formal, watchdog beat. Focuses on hard news, legislation, institutional maneuvers, and global events.
2. **Opinion:** The editorial beat. Focuses on analysis, political perspectives, and ideological arguments.
3. **Culture:** The society beat. Focuses on arts, hyper-local events, satire, and lifestyle.

Do **NOT** use legacy categories such as "World," "Analysis," or "Dispatch."

## Page Structure (Home vs. Current)
- **Home Page (`index.html`):** Acts as the spotlight. Its top section features **only 1 article**—the single most critical piece (if Politics/Insider) or the most hilarious piece (if Society) from the 3 main categories. Below the spotlight, it maintains an article grid with the next 2 most recent articles.
- **Current Page (`current-articles.html`):** Acts as the chronological feed. It simply lists the **3 most recent articles**, completely regardless of which category they fall into.

## Lore and Background Information
If extra information is needed for generating content, writing articles, or understanding the universe context, it is highly advisable to research the [Caprica Miraheze Wiki](https://caprica.miraheze.org). This is the definitive source for things such as:
- Regions and geography
- Political parties and figures
- General world-building

Or simply ask the user

**Note:** Some information on the wiki may not be perfectly up to date, so exercise judgment and rely on the established AVIS tone and context when there are gaps.

**CRITICAL:** You must also check `.agents/lore.md` before drafting articles for the latest ongoing storylines and events provided by the user. Whenever the user provides new lore or ongoing context in a prompt, you MUST note it down in `.agents/lore.md` so that it is persisted for future updates.

## Article Writing & Formatting Rules
When drafting articles, you must strictly adhere to the following rules:
1. **Always Verify Factions:** Before writing any article, you MUST check the current list of political parties in Caprica (via the Caprica Miraheze Wiki) to ensure you are referencing active and accurate factions.
2. **No Em Dashes:** Do NOT use em dashes (`—`). Stick exclusively to standard hyphens (`-`).
3. **Avoid Cliche & Negative/Positive Phrasing:** Never use the "is not X - but Y" phrasing (e.g., "The issue is not the budget - but the timeline."). Do NOT use the *negative*, *positive* phrasing, such as "Greens enter Parliament not as an insurgent startup, but as a seasoned player". Write straightforward, direct, professional copy.
4. **C1 English Level:** Keep the vocabulary, sentence structure, and overall prose strictly at a C1 (Advanced) English level—sophisticated and professional, but not overly convoluted or archaic.
5. **Paragraph Spacing:** Always separate paragraphs with a blank line to ensure readability (e.g., use `<br><br>` in JSON content or an empty line between `<p>` tags in HTML files).

## Article Timestamps
To find out what the current in-Caprica fictional date is, you MUST check the live date fetched from the Caprica Miraheze Wiki Main Page (e.g. `March 6, 2066`). The timestamp inside the actual article files MUST be a hardcoded, static string that matches this in-universe date at the time of writing (e.g., `6 March 2066, 14:30`). Do not use real-world dates, and do not leave dynamic tags like `<span class="live-caprica-date">` inside article markdown files.

import json
import re
import os

with open('articles.json', 'r') as f:
    articles = json.load(f)

# Ensure articles directory exists
os.makedirs('articles', exist_ok=True)

def generate_grid_article(article):
    url = f"articles/{article['id']}.html"
    return f'''
            <article class="grid-story" id="{article['id']}">
                <span class="category-tag">{article['category']}</span>
                <h3 class="headline"><a href="{url}">{article['headline']}</a></h3>
                <p class="summary">{article['summary']}</p>
                <div class="meta">
                    <span class="byline">{article['byline']}</span>
                    <span class="timestamp">{article['timestamp']}</span>
                </div>
            </article>
'''

def generate_top_story(article):
    url = f"articles/{article['id']}.html"
    return f'''
            <div class="top-story-content">
                <span class="category-tag">{article['category']}</span>
                <h2 class="headline"><a href="{url}">{article['headline']}</a></h2>
                <p class="summary">{article['summary']}</p>
                <div class="meta">
                    <span class="byline">{article['byline']}</span>
                    <span class="timestamp">{article['timestamp']}</span>
                </div>
            </div>
'''

def generate_article_page(article):
    # Using index.html as a base layout
    with open('index.html', 'r') as f:
        base_html = f.read()
    
    # Replace title
    base_html = re.sub(r'<title>.*?</title>', f'<title>AVIS - {article["headline"]}</title>', base_html)
    
    # Fix paths for assets since we are inside /articles/ folder now
    base_html = base_html.replace('href="css/', 'href="../css/')
    base_html = base_html.replace('src="js/', 'src="../js/')
    base_html = base_html.replace('href="assets/', 'href="../assets/')
    base_html = base_html.replace('content="assets/', 'content="../assets/')
    
    # Fix nav links
    base_html = base_html.replace('href="index.html"', 'href="../index.html"')
    base_html = base_html.replace('href="current-articles.html"', 'href="../current-articles.html"')
    base_html = base_html.replace('href="politics.html"', 'href="../politics.html"')
    base_html = base_html.replace('href="insider.html"', 'href="../insider.html"')
    base_html = base_html.replace('href="society.html"', 'href="../society.html"')
    base_html = base_html.replace('href="about.html"', 'href="../about.html"')
    
    # Build article content
    content = article.get('content', article['summary']) # Fallback to summary if no content
    
    article_html = f'''
        <article class="full-article" style="max-width: 800px; margin: 4rem auto; padding: 0 2rem;">
            <span class="category-tag">{article['category']}</span>
            <h1 class="headline" style="font-size: 2.5rem; margin-bottom: 1rem;">{article['headline']}</h1>
            <div class="meta" style="margin-bottom: 2rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
                <span class="byline">{article['byline']}</span>
                <span class="timestamp">{article['timestamp']}</span>
            </div>
            <div class="article-body" style="font-size: 1.1rem; line-height: 1.8;">
                <p>{content}</p>
            </div>
        </article>
'''
    
    # Replace main content area
    base_html = re.sub(r'<main class="site-content">.*?</main>', 
                       f'<main class="site-content">\n{article_html}\n</main>', 
                       base_html, flags=re.DOTALL)
                       
    with open(f"articles/{article['id']}.html", 'w') as f:
        f.write(base_html)

def update_file(filename, top_story_html, grid_html):
    if not os.path.exists(filename):
        return
        
    with open(filename, 'r') as f:
        content = f.read()
        
    if top_story_html is not None and '<section class="top-story"' in content:
        content = re.sub(r'(<section class="top-story"[^>]*>).*?(</section>)', 
                         r'\1\n' + top_story_html + r'        \2', 
                         content, flags=re.DOTALL)
                         
    if '<section class="article-grid"' in content:
        content = re.sub(r'(<section class="article-grid"[^>]*>).*?(</section>)', 
                         r'\1\n' + grid_html + r'        \2', 
                         content, flags=re.DOTALL)
                         
    with open(filename, 'w') as f:
        f.write(content)

# Update pages and generate articles
if len(articles) > 0:
    top_story_article = next((a for a in articles if a.get('is_top_story')), articles[0])
else:
    top_story_article = None
    
index_grid_articles = [a for a in articles if a != top_story_article][:4]

index_top_html = generate_top_story(top_story_article) if top_story_article else ""
index_grid_html = "".join(generate_grid_article(a) for a in index_grid_articles)
update_file('index.html', index_top_html, index_grid_html)

current_3 = articles[:3]
current_grid_html = "".join(generate_grid_article(a) for a in current_3)
update_file('current-articles.html', None, current_grid_html)

for category in ['POLITICS', 'INSIDER', 'SOCIETY']:
    cat_articles = [a for a in articles if a['category'] == category]
    if not cat_articles:
        grid_html = '\n            <p style="text-align: center; color: var(--color-text-light); width: 100%;">No articles in this category currently.</p>\n'
    else:
        grid_html = "".join(generate_grid_article(a) for a in cat_articles)
    update_file(f"{category.lower()}.html", None, grid_html)

# Generate individual pages
for article in articles:
    generate_article_page(article)

print("Publishing complete! All HTML files and individual article pages have been rebuilt.")

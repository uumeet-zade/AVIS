import csv

voters = []
with open('/Users/umidgasimzade/.gemini/antigravity-ide/brain/b48f9755-d7e2-4667-9437-54d19754ac3f/.system_generated/steps/596/content.md', 'r') as f:
    # Skip frontmatter
    for _ in range(8):
        next(f)
    reader = csv.reader(f)
    next(reader) # skip header
    for row in reader:
        if len(row) > 5:
            voters.append(row)

intentions = {}
total_decided = 0
for v in voters:
    intent = v[2].strip()
    if intent:
        intentions[intent] = intentions.get(intent, 0) + 1
        if intent != 'No intentions':
            total_decided += 1

print("INTENTIONS:")
for k, val in intentions.items():
    if k != 'No intentions':
        print(f"{k}: {val} ({(val/total_decided)*100:.1f}%)")
print(f"No int: {intentions.get('No intentions', 0)}")

def approve(idx):
    app = 0
    for v in voters:
        if int(v[idx]) >= 4:
            app += 1
    return (app / len(voters)) * 100

print(f"Arkas: {approve(3):.1f}%")
print(f"Bluespan: {approve(4):.1f}%")
print(f"Cutter: {approve(5):.1f}%")


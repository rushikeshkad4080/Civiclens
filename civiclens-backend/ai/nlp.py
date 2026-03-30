def classify_text(text: str):
    if "garbage" in text.lower():
        return "Garbage Issue"
    if "pothole" in text.lower():
        return "Road Damage"
    return "General Issue"

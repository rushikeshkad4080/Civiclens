def predict_priority(issue_type: str):
    if issue_type in ["Road Damage", "Garbage Issue"]:
        return "High"
    return "Medium"

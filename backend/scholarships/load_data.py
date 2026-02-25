import json
from .models import Scholarship

def load_scholarships():
    with open('scholarships/data.json') as f:
        data = json.load(f)

    for item in data:
        Scholarship.objects.create(**item)

    print("Data loaded!")
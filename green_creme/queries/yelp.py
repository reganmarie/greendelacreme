import requests
import os

YELP_API_KEY = os.environ["YELP_API_KEY"]


class YelpQueries:
    def get_yelp(
        self,
        city: str,
        state: str,
    ):
        url = "https://api.yelp.com/v3/businesses/search"
        params = {
            "location": f"{city}, {state}",
            "term": "nurseries & gardening",
            "categories": "gardening",
            "sort_by": "best_match",
            "limit": 20,
        }
        headers = {
            "Authorization": f"Bearer {YELP_API_KEY}",
            "Content-Type": "application/json",
        }
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        return data

import requests
from bs4 import BeautifulSoup


base_url = "https://onkoi.vn/"

# Get all brand of fish food
# temp_arr = []
# response = requests.get(base_url)
# soup = BeautifulSoup(response.text, "html.parser")
# brand_of_fish_food = soup.find("li", attrs={"id": "menu-item-307"}).find_all("li")
# for each_brand in brand_of_fish_food:
#     brand = each_brand.find("a")
#     temp_arr.append(brand["href"])

arr = ['https://onkoi.vn/cam-ca-onkoi', 'https://onkoi.vn/cam-jdp-japan', 'https://onkoi.vn/thuong-hieu/sakura', 'https://onkoi.vn/cam-hikari', 'https://onkoi.vn/thuong-hieu/aquamaster']

for value in arr:
    response = requests.get(value)
    soup = BeautifulSoup(response.text, "html.parser")

    # Get list products




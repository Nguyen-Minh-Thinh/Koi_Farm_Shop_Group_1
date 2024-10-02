import requests
from bs4 import BeautifulSoup
import unidecode
import mysql.connector

# Variable to hold the database connection
conn = None

try: 
    conn = mysql.connector.connect(host='localhost',
                                   port=3306,
                                   database='koi_farm_shop',
                                   user='root',
                                   password='26122004')
    # Check if the connection is successfully established
    if conn.is_connected():
        print('Connected to MySQL database')
except Exception as e:
    print("Xay ra loi:", e)

cursor = conn.cursor()

cursor.execute("drop table if exists ca_koi_nhat")
create_table_query = """CREATE TABLE ca_koi_nhat (
    image VARCHAR(255),
    sale_status VARCHAR(50),
    name_of_fish VARCHAR(100),
    id_of_fish VARCHAR(50),
    note TEXT,
    price VARCHAR(50),
    sale_person VARCHAR(100),
    sex_of_fish VARCHAR(50),
    dob_of_fish VARCHAR(50),
    size_of_fish VARCHAR(50),
    type_of_fish VARCHAR(100),
    origin_of_fish VARCHAR(100)
);"""

cursor.execute(create_table_query)

base_url = "https://onkoi.vn/"

# Get all type of fish
# temp_arr = []
# type_of_fishes = soup.find("li", attrs={"id": "menu-item-306"}).find_all("li")
# for each_type in type_of_fishes:
#     value = each_type.find("a").text.split()[1]
#     temp_arr.append(value)
# # temp_arr = ['Kohaku', 'Ogon', 'Showa', 'Tancho', 'Bekko', 'Doitsu', 'Ginrin', 'Goshiki', 'Benigoi', 'Asagi', 'Platinum', 'Shusui']
# print(temp_arr)

arr = ['Kohaku', 'Ogon', 'Showa', 'Tancho', 'Bekko', 'Doitsu', 'Ginrin', 'Goshiki', 'Benigoi', 'Asagi', 'Platinum', 'Shusui']
for value in arr:
    response = requests.get(base_url + value)

    soup = BeautifulSoup(response.text, 'html.parser')
    # Get list products
    # Tag + attribute
    list_products = soup.find("div", attrs={"class": "list_products"})
    item_products = list_products.find_all("div", attrs={"class": "item_pro"})

    for item in item_products:
        # print(item)
        # Get image
        images = item.find("div", attrs={"class": "img"}).find("img")
        for image in images["data-srcset"].split(', '):
            if "600w" in image:
                image = image.split()[0]
                break
        
        # Get caption
        caption = item.find("div", attrs={"class": "capt"})
        sale_status = caption.find("span", attrs={"class": "sub_head"}).text
        name = caption.find("span", attrs={"class": "name"})
        name_of_fish = name.find("a").text
        id_of_fish = name.find("span", attrs={"class": "sku"}).text

        # Get description
        note = item.find("div", attrs={"class": "note"}).find("p").text

        # Get price
        price = item.find("div", attrs={"class": "box_price"}).find("span", attrs={"class": "price"}).text

        # Get extra information
        # sale_person = item.find("div", attrs={"class": "property"}).find_all("span")[1].text
        extra_infor = item.find("div", attrs={"class": "property"}).find_all("div")
        temp_dict = {
            
        }
        for sub_infor in extra_infor:
            if sub_infor.text.strip() == "":
                continue
            else:
                title = sub_infor.find('span', class_='tit').text.strip().rstrip(",")
                value = sub_infor.find('span', class_='value').text.strip().rstrip(",")
                temp_dict[title] = value
        sale_person = temp_dict.get("Người bán:")
        sex_of_fish = temp_dict.get("Giới tính:")
        dob_of_fish = temp_dict.get("Năm sinh:")
        size_of_fish = temp_dict.get("Kích thước:")
        type_of_fish = temp_dict.get("Giống:").replace(",", " ,").split()[2].capitalize()
        origin_of_fish = temp_dict.get("Nguồn gốc:")
        # print(temp_dict.get("Giống:").replace(",", " ,").split()[2].capitalize())
        result = f"Image: {image}, \nSale Status: {sale_status}, \
            \nName of fish: {name_of_fish}, \nId of fish: {id_of_fish}, \nNote: {note}, \
            \nPrice: {price}, \nSale person: {sale_person}, \nSex of fish: {sex_of_fish}, \
            \nDob of fish: {dob_of_fish}, \nSize of fish: {size_of_fish}, \nType of fish: {type_of_fish}, \
            \nOrigin of fish: {origin_of_fish}"
        
        insert_query = f"""
                        insert into ca_koi_nhat(image, sale_status, name_of_fish, id_of_fish, note, price, sale_person, sex_of_fish, dob_of_fish, size_of_fish, type_of_fish, origin_of_fish)
                        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """
        args = (image, sale_status, name_of_fish, id_of_fish, note, price, sale_person, sex_of_fish, dob_of_fish, size_of_fish, type_of_fish, origin_of_fish)
        cursor.execute(insert_query, args)
        conn.commit()
        # print()
        # print()


cursor.close()
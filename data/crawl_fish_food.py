import requests
from bs4 import BeautifulSoup
import mysql.connector

try:
    conn = mysql.connector.connect(host="localhost",
                                   port="3306",
                                   user="root",
                                   password="26122004",
                                   database="koi_farm_shop")

except Exception as e:
    print(e)
else:
    cursor = conn.cursor()

    cursor.execute("drop table if exists thuc_an_cho_ca")
    create_table_query = """
        CREATE TABLE if not exists thuc_an_cho_ca (
            Id VARCHAR(10) PRIMARY KEY, -- Định danh cho từng sản phẩm
            Image TEXT, -- Đường dẫn URL đến hình ảnh sản phẩm
            Caption TEXT, -- Tiêu đề mô tả ngắn về sản phẩm
            Note TEXT, -- Thông tin chi tiết về sản phẩm
            Price varchar(20), -- Giá của sản phẩm (VNĐ)
            Sale_person VARCHAR(50), -- Người bán hoặc đại diện phân phối
            Brand VARCHAR(50), -- Thương hiệu của sản phẩm
            Type_of_food VARCHAR(50), -- Loại thức ăn (ví dụ: Hạt nổi)
            Origin VARCHAR(50), -- Xuất xứ sản phẩm (quốc gia)
            Weight VARCHAR(20) -- Trọng lượng của sản phẩm
);
    """
    cursor.execute(create_table_query)
    arr = ["thuong-hieu/sakura", "cam-hikari", "thuong-hieu/aquamaster"]
    base_url = r"https://onkoi.vn/"
    for value in arr:
        response = requests.get(base_url + value)

        soup = BeautifulSoup(response.text, "html.parser")
        list_products = soup.find_all("div", attrs={"class": "list_products"})
        item_pro_list = []
        for list_product in list_products:
            for item_pro in list_product.find_all("div", attrs={"class": "item_pro"}):
                item_pro_list.append(item_pro)

        for item_pro in item_pro_list:
            images = item_pro.find("div", attrs={"class": "img"}).find("img")
            for image in images["data-srcset"].split(', '):
                if "600w" in image:
                    image = image.split()[0]
                    break
            info = item_pro.find("div", attrs={"class": "info"})
            caption = info.find("div", attrs={"class": "capt"}).find("span", attrs={"class": "name"}).text.strip()
            id = caption.split("\n")[1].replace("#", "")
            caption = caption.split("\n")[0]
            note = info.find("div", attrs={"class": "note"}).find("p")
            if note is None:
                ul = info.find("div", attrs={"class": "note"}).find("ul").find_all("li")
                note = list()
                for li in ul:
                    note.append(li.text)
                note = ", ".join(note)
            else:
                note = note.text

            price = info.find("div", attrs={"class": "box_price"}).find_all("bdi")
            if len(price)==0:
                price = info.find("div", attrs={"class": "box_price"}).find("span", attrs={"class": "price"}).text
            else:
                price = "".join(price[-1].text.split()[0].split("."))
            
            property = info.find("div", attrs={"class": "property"})
            proper_row_list = property.find_all("div", attrs={"class":"proper_row"})
            for box_proper in proper_row_list:
                if "Người bán" in box_proper.text:
                    sale_person = box_proper.find("span", attrs={"class": "value"}).text
                elif "Thương hiệu" in box_proper.text:
                    brand = box_proper.find("span", attrs={"class": "value"}).text
                    if "hikari" in brand.lower():
                        brand = "Hikari"
                    elif "master" in brand.lower():
                        brand = "Aqua Master"
                    elif "sakura" in brand.lower():
                        brand = "Sakura"
                elif "Dạng cám" in box_proper.text:
                    type_of_food = box_proper.find("span", attrs={"class": "value"}).text.replace(",", "")
                elif "Xuất sứ" in box_proper.text:
                    origin = box_proper.find("span", attrs={"class": "value"}).text.replace(",", "")
                elif "Trọng lượng" in box_proper.text:
                    weight = box_proper.find("span", attrs={"class": "value"}).find("a").text
            
            result = f"Id: {id}\nImage: {image}\nCaption: {caption}\nNote: {note}\nPrice: {price}\nSale_person: {sale_person}\nBrand: {brand}\nType_of_food: {type_of_food}\nOrigin: {origin}\nWeight: {weight}\n" 
            print(result)
            # print(result)
            insert_query = f"""
                        insert ignore into thuc_an_cho_ca (Id, Image, Caption, Note, Price, Sale_person, Brand, Type_of_food, Origin, Weight)
                        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """
            args = (id, image, caption, note, price, sale_person, brand, type_of_food, origin, weight)

            cursor.execute(insert_query, args)
            conn.commit()
    cursor.close()
    conn.close()
    ...
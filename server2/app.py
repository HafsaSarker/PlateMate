from flask import Flask, jsonify
from pymongo import MongoClient
import certifi
from bson import json_util, ObjectId
import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from flask_cors import CORS
import os
from sklearn.metrics import silhouette_score

url = os.environ.get('MONGO_URI')

app = Flask(__name__)

CORS(app)

client = MongoClient(url, tlsCAFile=certifi.where())

db = client.test
users_collection = db.users

def assign_categories(users):
    category_map = {
    'Afghan': 1,
    'African': 2,
    'Senegalese': 3,
    'South African': 4,
    'American (New)': 5,
    'American (Traditional)': 6,
    'Andalusian': 7,
    'Arabian': 8,
    'Arab Pizza': 9,
    'Argentine': 10,
    'Armenian': 11,
    'Asian Fusion': 12,
    'Asturian': 13,
    'Australian': 14,
    'Austrian': 15,
    'Baguettes': 16,
    'Bangladeshi': 17,
    'Barbeque': 18,
    'Basque': 19,
    'Bavarian': 20,
    'Beer Garden': 21,
    'Beer Hall': 22,
    'Beisl': 23,
    'Belgian': 24,
    'Flemish': 25,
    'Bistros': 26,
    'Black Sea': 27,
    'Brasseries': 28,
    'Brazilian': 29,
    'Brazilian Empanadas': 30,
    'Central Brazilian': 31,
    'Northeastern Brazilian': 32,
    'Northern Brazilian': 33,
    'Rodizios': 34,
    'Breakfast & Brunch': 35,
    'Pancakes': 36,
    'British': 37,
    'Buffets': 38,
    'Bulgarian': 39,
    'Burgers': 40,
    'Burmese': 41,
    'Cafes': 42,
    'Themed Cafes': 43,
    'Cafeteria': 44,
    'Cambodian': 45,
    'Canadian (New)': 46,
    'Canteen': 47,
    'Caribbean': 48,
    'Dominican': 49,
    'Haitian': 50,
    'Puerto Rican': 51,
    'Trinidadian': 52,
    'Catalan': 53,
    'Cheesesteaks': 54,
    'Chicken Shop': 55,
    'Chicken Wings': 56,
    'Chilean': 57,
    'Chinese': 58,
    'Cantonese': 59,
    'Congee': 60,
    'Dim Sum': 61,
    'Fuzhou': 62,
    'Hainan': 63,
    'Hakka': 64,
    'Henghwa': 65,
    'Hokkien': 66,
    'Hunan': 67,
    'Pekinese': 68,
    'Shanghainese': 69,
    'Szechuan': 70,
    'Teochew': 71,
    'Comfort Food': 72,
    'Corsican': 73,
    'Creperies': 74,
    'Cuban': 75,
    'Curry Sausage': 76,
    'Cypriot': 77,
    'Czech': 78,
    'Danish': 79,
    'Delis': 80,
    'Diners': 81,
    'Dinner Theater': 82,
    'Dumplings': 83,
    'Eastern European': 84,
    'Eritrean': 85,
    'Ethiopian': 86,
    'Fast Food': 87,
    'Filipino': 88,
    'Fischbroetchen': 89,
    'Fish & Chips': 90,
    'Flatbread': 91,
    'Fondue': 92,
    'Food Court': 93,
    'Food Stands': 94,
    'Freiduria': 95,
    'French': 96,
    'Alsatian': 97,
    'Auvergnat': 98,
    'Berrichon': 99,
    'Bourguignon': 100,
    'Mauritius': 101,
    'Nicoise': 102,
    'Provencal': 103,
    'Reunion': 104,
    'French Southwest': 105,
    'Galician': 106,
    'Game Meat': 107,
    'Gastropubs': 108,
    'Georgian': 109,
    'German': 110,
    'Baden': 111,
    'Eastern German': 112,
    'Franconian': 113,
    'Hessian': 114,
    'Northern German': 115,
    'Palatine': 116,
    'Rhinelandian': 117,
    'Giblets': 118,
    'Gluten-Free': 119,
    'Greek': 120,
    'Guamanian': 121,
    'Halal': 122,
    'Hawaiian': 123,
    'Heuriger': 124,
    'Himalayan/Nepalese': 125,
    'Honduran': 126,
    'Hong Kong Style Cafe': 127,
    'Hot Dogs': 128,
    'Hot Pot': 129,
    'Hungarian': 130,
    'Iberian': 131,
    'Indian': 132,
    'Indonesian': 133,
    'International': 134,
    'Irish': 135,
    'Island Pub': 136,
    'Israeli': 137,
    'Italian': 138,
    'Abruzzese': 139,
    'Altoatesine': 140,
    'Apulian': 141,
    'Calabrian': 142,
    'Cucina Campana': 143,
    'Emilian': 144,
    'Friulan': 145,
    'Ligurian': 146,
    'Lumbard': 147,
    'Napoletana': 148,
    'Piemonte': 149,
    'Roman': 150,
    'Sardinian': 151,
    'Sicilian': 152,
    'Tuscan': 153,
    'Venetian': 154,
    'Japanese': 155,
    'Blowfish': 156,
    'Conveyor Belt Sushi': 157,
    'Donburi': 158,
    'Gyudon': 159,
    'Oyakodon': 160,
    'Hand Rolls': 161,
    'Horumon': 162,
    'Izakaya': 163,
    'Japanese Curry': 164,
    'Kaiseki': 165,
    'Kushikatsu': 166,
    'Oden': 167,
    'Okinawan': 168,
    'Okonomiyaki': 169,
    'Onigiri': 170,
    'Ramen': 171,
    'Robatayaki': 172,
    'Soba': 173,
    'Sukiyaki': 174,
    'Takoyaki': 175,
    'Tempura': 176,
    'Teppanyaki': 177,
    'Tonkatsu': 178,
    'Udon': 179,
    'Unagi': 180,
    'Western Style Japanese Food': 181,
    'Yakiniku': 182,
    'Yakitori': 183,
    'Jewish': 184,
    'Kebab': 185,
    'Kopitiam': 186,
    'Korean': 187,
    'Kosher': 188,
    'Kurdish': 189,
    'Laos': 190,
    'Laotian': 191,
    'Latin American': 192,
    'Colombian': 193,
    'Salvadoran': 194,
    'Venezuelan': 195,
    'Lyonnais': 196,
    'Malaysian': 197,
    'Mamak': 198,
    'Nyonya': 199,
    'Meatballs': 200,
    'Mediterranean': 201,
    'Falafel': 202,
    'Mexican': 203,
    'Eastern Mexican': 204,
    'Jaliscan': 205,
    'Northern Mexican': 206,
    'Oaxacan': 207,
    'Pueblan': 208,
    'Tacos': 209,
    'Tamales': 210,
    'Yucatan': 211,
    'Middle Eastern': 212,
    'Egyptian': 213,
    'Lebanese': 214,
    'Milk Bars': 215,
    'Modern Australian': 216,
    'Modern European': 217,
    'Mongolian': 218,
    'Moroccan': 219,
    'New Mexican Cuisine': 220,
    'New Zealand': 221,
    'Nicaraguan': 222,
    'Night Food': 223,
    'Nikkei': 224,
    'Noodles': 225,
    'Norcinerie': 226,
    'Open Sandwiches': 227,
    'Oriental': 228,
    'Pakistani': 229,
    'Pan Asian': 230,
    'Parent Cafes': 231,
    'Parma': 232,
    'Peruvian': 233,
    'Pita': 234,
    'Pizza': 235,
    'Polish': 236,
    'Pierogis': 237,
    'Polynesian': 238,
    'Pop-Up Restaurants': 239,
    'Portuguese': 240,
    'Alentejo': 241,
    'Algarve': 242,
    'Azores': 243,
    'Beira': 244,
    'Fado Houses': 245,
    'Madeira': 246,
    'Minho': 247,
    'Ribatejo': 248,
    'Tras-os-Montes': 249,
    'Potatoes': 250,
    'Poutineries': 251,
    'Pub Food': 252,
    'Rice': 253,
    'Romanian': 254,
    'Rotisserie Chicken': 255,
    'Russian': 256,
    'Salad': 257,
    'Sandwiches': 258,
    'Scandinavian': 259,
    'Schnitzel': 260,
    'Scottish': 261,
    'Seafood': 262,
    'Serbo Croatian': 263,
    'Signature Cuisine': 264,
    'Singaporean': 265,
    'Slovakian': 266,
    'Somali': 267,
    'Soul Food': 268,
    'Soup': 269,
    'Southern': 270,
    'Spanish': 271,
    'Sri Lankan': 272,
    'Steakhouses': 273,
    'Supper Clubs': 274,
    'Sushi Bars': 275,
    'Swabian': 276,
    'Swedish': 277,
    'Swiss Food': 278,
    'Syrian': 279,
    'Tabernas': 280,
    'Taiwanese': 281,
    'Tapas Bars': 282,
    'Tavola Calda': 283,
    'Tex-Mex': 284,
    'Thai': 285,
    'Traditional Norwegian': 286,
    'Traditional Swedish': 287,
    'Trattorie': 288,
    'Turkish': 289,
    'Chee Kufta': 290,
    'Gozleme': 291,
    'Homemade Food': 292,
    'Lahmacun': 293,
    'Ottoman Cuisine': 294,
    'Turkish Ravioli': 295,
    'Ukrainian': 296,
    'Uzbek': 297,
    'Vegan': 298,
    'Vegetarian': 299,
    'Venison': 300,
    'Vietnamese': 301,
    'Waffles': 302,
    'Wok': 303,
    'Wraps': 304,
    'Yugoslav': 305,
    'Cajun': 306,
    'Creole': 306, 
    'Czech': 307,
    'Slovakian': 307,
    'Live': 308,
    'Raw Food': 308, 
    'Tapas': 309,
    'Small Plates': 309, 
    'Arroceria': 310,
    'Paella': 310,
    'PF': 311,
    'Comercial': 311,
    'Persian': 312,
    'Iranian': 312
    }
    users['profile.foodCategory'] = users['profile.foodCategory'].map(category_map)
    for i in range(4):
        users.loc[(users[f'profile.restaurantAttributes[{i+1}]'] == 'parking_lot'), f'profile.restaurantAttributes[{i+1}]'] = 1
        users.loc[(users[f'profile.restaurantAttributes[{i+1}]'] == 'deals'), f'profile.restaurantAttributes[{i+1}]'] = 2
        users.loc[(users[f'profile.restaurantAttributes[{i+1}]'] == 'wheelchair_accessible'), f'profile.restaurantAttributes[{i+1}]'] = 3
        users.loc[(users[f'profile.restaurantAttributes[{i+1}]'] == 'outdoor_seating'), f'profile.restaurantAttributes[{i+1}]'] = 4
        users.loc[(users[f'profile.restaurantAttributes[{i+1}]'] == 'wifi_free'), f'profile.restaurantAttributes[{i+1}]'] = 5
    
    users.loc[(users['profile.sex'] == 'Male'), 'profile.sex'] = 1
    users.loc[(users['profile.sex'] == 'male'), 'profile.sex'] = 1
    users.loc[(users['profile.sex'] == 'Female'), 'profile.sex'] = 2
    users.loc[(users['profile.sex'] == 'female'), 'profile.sex'] = 2
    users.loc[(users['profile.sex'] == 'Other'), 'profile.sex'] = 3
    users.loc[(users['profile.sex'] == 'other'), 'profile.sex'] = 3
    users.loc[(users['profile.sex'] == 0), 'profile.sex'] = 3
    
    users['profile.height_ft'].fillna(0, inplace=True)
    users['profile.height_in'].fillna(0, inplace=True)
    users['profile.height_ft'] = pd.to_numeric(users['profile.height_ft'], errors='coerce')
    users['profile.height_in'] = pd.to_numeric(users['profile.height_in'], errors='coerce')
    users['profile.height'] = users['profile.height_ft'] * 12 + users['profile.height_in']
    users['profile.height'] = pd.to_numeric(users['profile.height'], errors='coerce')
    
    users.loc[(users['profile.age'] == 'None'), 'profile.age'] = 18
    users['profile.age'] = pd.to_numeric(users['profile.age'], errors='coerce')
    
    users['profile.restaurantAttributes[1]'] = pd.to_numeric(users['profile.restaurantAttributes[1]'], errors='coerce')
    users['profile.restaurantAttributes[2]'] = pd.to_numeric(users['profile.restaurantAttributes[2]'], errors='coerce')
    users['profile.sex'] = pd.to_numeric(users['profile.sex'], errors='coerce')
    
    users['profile.restaurantAttributes[1]'].fillna(0, inplace=True)
    users['profile.restaurantAttributes[2]'].fillna(0, inplace=True)
    users['profile.sex'].fillna(0, inplace=True)
    
    users['profile.restaurantAttributes[1]'] = users['profile.restaurantAttributes[1]'].astype(int)
    users['profile.restaurantAttributes[2]'] = users['profile.restaurantAttributes[2]'].astype(int)
    users['profile.sex'] = users['profile.sex'].astype(int)
    
    users['profile.pricePoint[1]'] = pd.to_numeric(users['profile.pricePoint[1]'], errors='coerce')
    users['profile.pricePoint[2]'] = pd.to_numeric(users['profile.pricePoint[2]'], errors='coerce')
    users['profile.pricePoint[3]'] = pd.to_numeric(users['profile.pricePoint[3]'], errors='coerce')
    
    return users

def calculate_silhouette_score(users_df):
    cluster_ids = matching_model(users_df)
    labels = []
    for cluster_id, users in cluster_ids.items():
        labels.extend([cluster_id] * len(users))
    silhouette = silhouette_score(users_df, labels)
    return silhouette

def new_dems(features, distance, n):
    return features.groupby(distance).apply(lambda x: np.exp(np.log(x).mean())).T

def centroid_randomizer(features, n):
    centroid_array = []
    for i in range(n):
        centroid = features.apply(lambda x: float(x.sample()))
        centroid_array.append(centroid)
    return pd.concat(centroid_array, axis=1)

def get_demographics(features, centroid_array):
    distance_formula = pd.DataFrame()
    for i in range(centroid_array.shape[1]):
        distance_formula[f'scale_{i+1}'] = np.sqrt(((features - centroid_array.iloc[:, i]) ** 2).sum(axis=1))
    return distance_formula.idxmin(axis=1)

def matching_model(users):
    features = users[["profile.sex", "profile.height", "profile.age", "profile.foodCategory","profile.restaurantAttributes[1]","profile.restaurantAttributes[2]","profile.restaurantAttributes[3]","profile.restaurantAttributes[4]","profile.pricePoint[1]","profile.pricePoint[2]","profile.pricePoint[3]","profile.smoke","profile.drink"]].fillna(0)
    features = features.apply(pd.to_numeric, errors='coerce')
    features.fillna(0, inplace=True)
    features = ((features - features.min()) / (features.max() - features.min())) * 9 + 1
    max_clusters = 10
    silhouette_scores = [silhouette_score(features, get_demographics(features, centroid_randomizer(features, n_clusters))) for n_clusters in range(2, max_clusters + 1)]
    mean_silhouette_score = np.mean(silhouette_scores)
    best_cluster_count_index = np.argmax(mean_silhouette_score)
    best_cluster_count = best_cluster_count_index + 2
    centroid_array = centroid_randomizer(features, best_cluster_count)
    distance = get_demographics(features, centroid_array)
    new_dem_display = new_dems(features, distance, best_cluster_count)
    cluster_ids = {}
    for cluster, _ in new_dem_display.items():
        cluster_ids[cluster] = users.index[distance == cluster].tolist()
    return cluster_ids

@app.route('/')
def index():
    return 'Connected to MongoDB'

@app.route('/match', methods=['GET'])
def get_users():
    find_values = {
  "_id": 1,
  "profile.sex": 1,
  "profile.height_ft": 1,
  "profile.height_in": 1,
  "profile.age": 1,
  "profile.lifeStyle": 1,
  "profile.foodCategory": 1,
  "profile.restaurantAttributes": 1,
  "profile.pricePoint": 1
}
    user_info = list(users_collection.find({}, find_values))
    
    for user in user_info:
        user['_id'] = str(user['_id'])
        
    flat_user_info = []
    for user in user_info:
        flat_user = {'_id': user['_id']}
        profile = user.get('profile', {})
        for key, value in profile.items():
            if isinstance(value, list):
                value = ', '.join(map(str, value))
            else:
                value = str(value)
            flat_user[f"profile.{key}"] = value
            restaurant_attrs = profile.get('restaurantAttributes', [])
            pricepoint_attribute = profile.get('pricePoint', [])
        for i in range(4):
            flat_user[f"profile.restaurantAttributes[{i+1}]"] = restaurant_attrs[i] if i < len(restaurant_attrs) else None
        for i in range(3):
            flat_user[f"profile.pricePoint[{i+1}]"] = pricepoint_attribute[i] if i < len(pricepoint_attribute) else None
        flat_user["profile.smoke"] = None
        flat_user["profile.drink"] = None
        life_style = profile.get("lifeStyle", [])
        if life_style:
            flat_user["profile.smoke"] = 1 if "Smoke" in life_style else 0
            flat_user["profile.drink"] = 1 if "Drink" in life_style else 0
        else:
            flat_user["profile.smoke"] = 0
            flat_user["profile.drink"] = 0
        flat_user_info.append(flat_user)
    
    if flat_user_info is None:
        return jsonify({"error": "Failed to process data"})
    
    users_df = pd.DataFrame(flat_user_info)
    
    users_df = assign_categories(users_df)
    
    users_df.drop(columns=['profile.pricePoint', 'profile.lifeStyle', 'profile.restaurantAttributes', 'profile.height_ft', 'profile.height_in'], inplace=True)
    
    default_value = 0
    users_df.fillna(default_value, inplace=True)
    
    users_dict = users_df.to_dict(orient='records')
    
    cluster_ids = matching_model(users_df)
    
    cluster_user_ids = {}
    for scale, user_indices in cluster_ids.items():
        cluster_user_ids[scale] = [users_dict[i]["_id"] for i in user_indices]
    
    return jsonify(cluster_user_ids)

if __name__ == '__main__':
    app.run(debug=True)

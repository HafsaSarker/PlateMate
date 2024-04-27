import { faker } from '@faker-js/faker';
import allCategories from './data/allCategories';
import axios from 'axios';

export async function generateRandomUsers() {
    for (let i = 0; i < 100; i++) {
        // generate fake user
        const gender = i % 2 === 0 ? 'male' : 'female';
        const firstName = faker.person.firstName(gender);
        const lastName = faker.person.lastName(gender);
        const email = faker.internet.email({ firstName: firstName, lastName: lastName });
        // same password so we can log in duh
        const password = "123456";

        const user = {
            email,
            authentication: {
                password,
            },
            profile: {
                firstName,
                lastName,
                profileImg: faker.image.avatar(),
                coverImg: faker.image.url(),
                about: faker.person.bio(),
                nationality: faker.location.country(),
                sex: gender,
                height_ft: faker.number.int({ min: 4, max: 7 }),
                height_in: faker.number.int({ min: 0, max: 11 }),
                age: faker.number.int({ min: 18, max: 65 }),
                smoke: faker.datatype.boolean(),
                drink: faker.datatype.boolean(),
                restaurantLocation: faker.location.city(),
                foodCategories: faker.helpers.arrayElements(allCategories, { min: 3, max: 10 }),
                restaurantAttributes: faker.helpers.arrayElements(['reservation', 'deals', 'wheelchair_accessible', 'parking_lot', 'outdoor_seating', 'wifi_free'], { min: 1, max: 4 }),
                pricePoint: faker.helpers.arrayElements(['1', '2', '3', '4'], { min: 1, max: 4 })
            }
        };

        try {

            // send to server
            const res = await axios.post(`http://localhost:8080/api/auth/register`, user);

            if (res.data) {
                console.log(`User ${i}: ${email} registered successfully.`);
                const uid = res.data._id
                // init an empty preference
                const preference_api_path = 'http://localhost:8080/api/preference/'
                const initPrefs = await axios.post(
                    preference_api_path,
                    { uid },
                    {
                        withCredentials: true,
                    },
                );
            }
        } catch (error) {
            console.error(`Error registering user ${i + 1}: ${email}`, error.response ? error.response.data : error.message);
        }



    }
}
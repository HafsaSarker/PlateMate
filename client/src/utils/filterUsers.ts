import { FilterForm } from '../types/filterForm';
import { User } from '../types/user';
import { matchFunctions } from './matchFunctions';

const {
  nationalityMatch,
  sexMatch,
  ageMatch,
  heightMatch,
  smokeMatch,
  drinkMatch,
} = matchFunctions;

export function filterUsers(
  preferences: FilterForm | null,
  users: User[] | null,
): User[] {
  if (!preferences || !users) {
    return [];
  }

  const {
    nationalities,
    age_from,
    age_to,
    drink,
    smoke,
    height_from_ft,
    height_from_in,
    height_to_ft,
    height_to_in,
    male,
    female,
    other,
  } = preferences;

  const filteredUsers = users.filter((user) => {
    const profile = user.profile;

    return (
      nationalityMatch(nationalities, profile.nationality) &&
      sexMatch(male, female, other, profile.sex) &&
      ageMatch(age_from, age_to, profile.age) &&
      heightMatch(
        height_from_ft,
        height_from_in,
        height_to_ft,
        height_to_in,
        profile.height_ft,
        profile.height_in,
      ) &&
      drinkMatch(drink, profile.drink) &&
      smokeMatch(smoke, profile.smoke)
    );
  });

  console.log(filteredUsers);

  return filteredUsers;
}

// Check if the user's nationality is in the current user's preferences
function nationalityMatch(
  nationalityPrefs: string[] | undefined,
  userNationality: string | undefined,
): boolean {
  // nationality pref is empty == user doent have pref on it
  if (
    !nationalityPrefs ||
    nationalityPrefs.length < 1 ||
    (userNationality && nationalityPrefs.includes(userNationality))
  ) {
    return true;
  }

  return false;
}

// Check if the user's sex matches the current user's preferences
function sexMatch(
  male: boolean | undefined,
  female: boolean | undefined,
  other: boolean | undefined,
  userSex: string | undefined,
): boolean {
  // user has no sex preference
  if (!male && !female && !other) {
    return true;
  }

  if (
    (male && userSex === 'male') ||
    (female && userSex == 'female') ||
    (other && userSex == 'other')
  ) {
    return true;
  }

  return false;
}

// Check if the user's age is within the current user's preferences
function ageMatch(
  age_from: number | undefined,
  age_to: number | undefined,
  userAge: number | undefined | null,
): boolean {
  // user's age prefs are default vals === no age prefs
  if ((age_from === 18 && age_to === 90) || (!age_from && !age_to)) {
    return true;
  }

  if (
    age_from &&
    userAge &&
    userAge >= age_from &&
    age_to &&
    userAge <= age_to
  ) {
    return true;
  }

  return false;
}

// Check height preferences
function heightMatch(
  height_from_ft: number | undefined,
  height_from_in: number | undefined,
  height_to_ft: number | undefined,
  height_to_in: number | undefined,
  user_height_ft: number | undefined | null,
  user_height_in: number | undefined | null,
): boolean {
  // no height prefs
  if (!height_from_ft && !height_from_in && !height_to_ft && !height_to_in) {
    return true;
  }

  // Convert user's height to inches
  const userHeightIn = (user_height_ft || 0) * 12 + (user_height_in || 0);

  // Convert height preferences to inches
  const minHeightIn = (height_from_ft || 0) * 12 + (height_from_in || 0);
  const maxHeightIn = (height_to_ft || 12) * 12 + (height_to_in || 12);

  const rangeStart: boolean = height_from_ft || height_from_in ? true : false;
  const rangeEnd: boolean = height_to_ft || height_to_in ? true : false;

  // height pref exist but matched user profile doesn't specify height
  if ((!user_height_ft || !user_height_in) && (rangeStart || rangeEnd)) {
    return false;
  }

  /*
      3 cases of inputs: 
      - both end of height range is specifed
      - only height from is specified
      - only height to is specified 
    */
  if (
    (rangeStart &&
      rangeEnd &&
      userHeightIn >= minHeightIn &&
      userHeightIn <= maxHeightIn) ||
    (rangeStart && !rangeEnd && userHeightIn >= minHeightIn) ||
    (rangeEnd && !rangeStart && userHeightIn <= maxHeightIn)
  ) {
    return true;
  }

  return false;
}
// Check smoking status
function smokeMatch(
  smoke: boolean | undefined,
  userSmoke: boolean | undefined,
): boolean {
  if (smoke === userSmoke) {
    return true;
  }

  return false;
}
// Check drinking status
function drinkMatch(
  drink: boolean | undefined,
  userDrink: boolean | undefined,
): boolean {
  if (drink === userDrink) {
    return true;
  }

  return false;
}

export const matchFunctions = {
  nationalityMatch,
  sexMatch,
  ageMatch,
  heightMatch,
  smokeMatch,
  drinkMatch,
};

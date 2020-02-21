import types from './types'

const getProfileAfterActionCheckIn = (profile: types.AttendeeProfile) => {
  profile.checked_in = true;
  return profile;
}

const getProfileAfterActionAttendWorkshop = (profile: types.AttendeeProfile) => {
  profile.num_workshops_attended++;
  return profile;
}

const getProfileAfterActionMap = {
  "check_in": getProfileAfterActionCheckIn,
  "attend_workshop": getProfileAfterActionAttendWorkshop
}

export default getProfileAfterActionMap
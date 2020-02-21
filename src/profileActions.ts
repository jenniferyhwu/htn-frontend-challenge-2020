import React from 'react';

const getProfileAfterActionCheckIn = (profile: any) => {
  profile.checked_in = true;
  return profile;
}

const getProfileAfterActionAttendWorkshop = (profile: any) => {
  profile.num_workshops_attended++;
  return profile;
}

export const getProfileAfterActionMap = {
  "check_in": getProfileAfterActionCheckIn,
  "attend_workshop": getProfileAfterActionAttendWorkshop
}
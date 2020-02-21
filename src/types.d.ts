declare module 'types' {
    // Each attendee will belong to one of the following groups
    type AttendeeType = "hacker" | "organizer" | "volunteer" | "sponsor";

    // Actions that can be applied to a profile
    // Note: some actions will only appear on profiles of certain types! (ex. call_phone for an "organizer")
    type Action = "check_in" | "attend_workshop" | "call_phone";

    // A profile for an attendee will look like so
    interface AttendeeProfile {
    id: number;
    name: string;
    profile_pic: string; // a url to an image
    bio?: string; // a paragraph describing the attendee
    type: AttendeeType;
    checked_in: boolean;
    actions: Action[];
    num_workshops_attended?: number; // all "hacker" type attendees (and no other types) will have this field
    sponsor_company?: string; // all "sponsor" type attendees (and no other types) will have this field
    sponsor_company_link?: string; // all "sponsor" type attendees (and no other types) will have this field
    next_shift?: number; // datetime (ms); all "volunteer" type attendees (and no other types) will have this field
    phone_number?: string; // all "organizer" type attendees (and no other types) will have this field
    }

    // What the endpoint will return (null means no profile was found)
    type EndpointResponse = AttendeeProfile | null;
}

export default types
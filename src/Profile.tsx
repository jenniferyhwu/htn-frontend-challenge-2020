import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from "styled-components";
import { Button, SubHeading, MainHeading } from './Components';
import getProfileAfterActionMap from './profileActions';
import types from './types'

const HTN_URL = 'https://hackthenorth.netlify.com/api/fe-challenge-attendee';

const LinkAttr = styled.a`
  color: inherit;
`;

const DescAttr = styled.p`
  color: #26c6da;
  line-height: 1.5em;
`;

const DescAttrContainer = styled.div`
  @media (min-width: 769px) {
    max-height: 50vh;
    overflow: scroll;
  }
`;

const SubAttr = styled(SubHeading)`
  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const SubAttrContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 769px) {
    > :not(:first-child) {
      margin-left: 20px;

      :before {
        content: "|";
        margin-right: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainAttr = styled(MainHeading)`
  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const ConfirmedButton = styled(Button)`
  color: #7ecc7a;
  background-color: white;
  border: 2px solid #7ecc7a;
  text-align: center;
`;

const ActionButton = styled(Button)`
  color: #26c6da;
  background-color: white;
  border: 1px solid transparent;

  :focus, :hover {
    border: 1px solid #26c6da;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 20px;
  }
`;

// the padding-bottom and width thing makes it so the height equals the width
// this allows the image to display as a square, regardless of its actual dimensions
const ProfilePictureContainer = styled.div`
  padding-bottom: 100%;
  width: 100%;
  border-radius: 20px;
  background-size: cover;
`;

const RightContainer = styled.div`
  flex: 3;
  display: block;
`;

const LeftContainer = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 30px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    > :not(:first-child) {
      margin-top: 30px;
    }
  }

  @media (min-width: 769px) {
    > :not(:first-child) {
      margin-left: 50px;
    }
  }
`;

const NoProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > :not(:first-child) {
    margin-top: 30px;
  }
`;

const snakeCaseToTitleCase = (s: types.AttendeeType) => {
  let buf = s.charAt(0).toUpperCase() + s.substr(1)
  return buf.replace(/_/g, " ");
}

const getTypeSpecificAttributes = (profile: types.AttendeeProfile) => {
  if (profile.type === "hacker") {
    return "Workshops attended: " + profile.num_workshops_attended;
  } else if (profile.type === "volunteer") {
    let date = new Date(profile.next_shift)
    return "Next shift: " + date.toLocaleString();
  } else if (profile.type === "sponsor") {
    return <>Company: <LinkAttr href={profile.sponsor_company_link}>{profile.sponsor_company}</LinkAttr></>
  } else if (profile.type === "organizer") {
    return "Phone number: " + profile.phone_number;
  }
}

export default function Profile() {
  const [profile, setProfileInState] = useState<types.EndpointResponse>({});

  // this is necessary because the react hook doesn't recognize changes to profile's properties as changes to state,
  // so with this we can trigger a forced rerender
  const [, updateState] = useState();
  const forceRerender = () => updateState({});

  // sets profile in state and storage so it can be viewed across refreshes
  const setProfile = (newProfile: types.EndpointResponse) => {
    setProfileInState(newProfile);
    sessionStorage.setItem("profile", JSON.stringify(newProfile));
  }

  // gets profile from session store if it exists, or gets it from endpoint
  const getProfile = () => {
    let stored = sessionStorage.getItem("profile");
    if (stored) {
      setProfileInState(JSON.parse(stored) as types.EndpointResponse);
    } else {
      axios.get(HTN_URL).then((response: types.EndpointResponse) =>
        setProfile(response.data)
      )
    }
  }

  // note that this function is only ever called after the profile is set (and not null)
  const getActionButton = (action: string) => {
    if (action === "check_in" && profile.checked_in) {
      return <ConfirmedButton as="div" key={action}>Checked in</ConfirmedButton>
    }

    let onClickAction = () => {
      let getProfileAfterAction = (getProfileAfterActionMap as types.AttendeeProfile)[action];
      if (getProfileAfterAction) {
        setProfile(getProfileAfterAction(profile));
        forceRerender();
      }
    }
    
    return <ActionButton onClick={onClickAction} key={action}>{snakeCaseToTitleCase(action)}</ActionButton>
  }

  useEffect(getProfile, []) // call endpoint once

  if (profile === null) { // endpoint called and returned null
    return (
      <NoProfileContainer>
        <MainAttr>Looks like you don't have a profile yet &#128558;</MainAttr>
        <ActionButton>Create a new one</ActionButton>
      </NoProfileContainer>
    )
  } else if (Object.entries(profile).length === 0) { // endpoint not called yet
    return (
      <Container/>
    )
  } else { // endpoint called and returned a user profile
    return (
      <Container>
        <LeftContainer>
          <ProfilePictureContainer style={{ backgroundImage: 'url(' + profile.profile_pic + ')' }} role="img" aria-label={"picture of " + profile.name}/>
          {profile.actions.length === 0 ? null :
            <ActionsContainer>
              {profile.actions.map((action: string) => getActionButton(action))}
            </ActionsContainer>
          }
        </LeftContainer>
        <RightContainer>
          <SubAttr>ID: {profile.id}</SubAttr>
          <MainAttr>{profile.name}</MainAttr>
          <SubAttrContainer>
            <SubAttr>{snakeCaseToTitleCase(profile.type)}</SubAttr>
            <SubAttr>{getTypeSpecificAttributes(profile)}</SubAttr>
          </SubAttrContainer>
          <DescAttrContainer>
            <DescAttr>{profile.bio}</DescAttr>
          </DescAttrContainer>
        </RightContainer>
      </Container>
    )
  }
}
import React, { FunctionComponent } from 'react';
import { SocialChannels } from '../../utils/models';
import styled from 'styled-components';
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaTelegram,
} from 'react-icons/fa';

interface SocialChannelListProps {
  channels: SocialChannels;
}

// Returns a proper icon for a given channel
const createSocialIcon = (channel: keyof SocialChannels) => {
  switch (channel) {
    case 'twitter':
      return <FaTwitter />;
    case 'facebook':
      return <FaFacebook />;
    case 'github':
      return <FaGithub />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'telegram':
      return <FaTelegram />;
  }
};

const StyledSocialChannels = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledSocialChannel = styled.li`
  display: inline-block;
  margin: 0 10px;
  font-size: 1.6em;
  opacity: 0.7;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;
  }
`;

const SocialChannelList: FunctionComponent<SocialChannelListProps> = ({
  channels,
}) => (
  <StyledSocialChannels>
    {Object.entries(channels).map(([channel, link]) => (
      <StyledSocialChannel key={channel}>
        <a href={link} target={channel} rel={`noopener`} aria-label={channel}>
          {createSocialIcon(channel as keyof SocialChannels)}
        </a>
      </StyledSocialChannel>
    ))}
  </StyledSocialChannels>
);

export default SocialChannelList;

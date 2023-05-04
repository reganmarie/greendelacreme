import React from 'react';
import { SvgIcon } from '@mui/material';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function DisabledButton({ username }) {
  return (
    <>
      <SvgIcon component={PersonAddRoundedIcon} data-tooltip-id={`sentrequest-${username}`} className="!w-5 !h-5 text-secondary-200 focus:outline-none" />
      <Tooltip id={`sentrequest-${username}`} content="Request sent already" place="right" className="!bg-secondary-200 font-semibold" />
    </>
  );
}

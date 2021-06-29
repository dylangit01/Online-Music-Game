import React from 'react';

import Disc from '../../../../assets/disc.png';
import './RoundUnknown.scss';
// import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

export default function RoundUnknown() {
  return (
    <div className='round-unknown'>
      <div>
        <img className='disc' src={Disc} alt='disc' />
        {/* <HelpOutlineOutlinedIcon className="question-mark"/> */}
      </div>
    </div>
  );
}

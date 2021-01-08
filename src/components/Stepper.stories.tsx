import React, { useState } from 'react';
import Stepper from './Stepper';

export default {
    title: 'Stepper',
    component: Stepper
};

export const Primary: React.VFC<{}> = () => {
    const [qty, setQty] = useState(0)
    return <Stepper value={qty} set={setQty} />
}
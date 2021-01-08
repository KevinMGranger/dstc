import React, { useState } from 'react';
import PlantRow from './PlantRow';
import data from '../domain/plants.json';
import { parsePlants } from '../domain/plant';

const plants = parsePlants(data).unsafeCoerce()

export default {
    title: 'PlantRow',
    component: PlantRow
};

export const Primary: React.VFC<{}> = () => {
    const [qty, setQty] = useState(0)
    return PlantRow({plant: plants[0], qty, setQty})
}
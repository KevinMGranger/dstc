import React, { useState } from 'react';
import PlantList from './PlantList';
import data from '../domain/plants.json';
import { parsePlants } from '../domain/plant';

const plants = parsePlants(data).unsafeCoerce()

export default {
    title: 'PlantList',
    component: PlantList
};

export const Primary: React.VFC<{}> = () => {
    return PlantList({plants})
}
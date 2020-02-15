import React from 'react';
import { ResData } from 'type';

const SuspenseHoc = (Com: React.FC<{ response: ResData<any> }>): React.FC<{ fetchData: () => any }> => ({ fetchData }) => <Com response={ fetchData() } />

export default SuspenseHoc
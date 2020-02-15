import React from 'react';
import { ResData } from 'type';

const SuspenseHoc = (Com: React.FC<{ res: ResData<any> }>): React.FC<{ fetch: () => any }> => ({ fetch }) => <Com res={ fetch() } />

export default SuspenseHoc
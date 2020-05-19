import * as React from 'react';

import Breadcrumb from '../src/components/Breadcrumb';

export default { title: 'Breadcrump' };

const breads = ['OTA Console', 'Aputure', 'Series Amaran', 'AL-MC'];

export const withoutMaxNode = () => (
  <Breadcrumb activeCls='active'>
    {
      breads.map(item => 
        <Breadcrumb.Item key={item} callback={() => { console.log(item) }}>{ item }</Breadcrumb.Item>
      )
    }
  </Breadcrumb>
);

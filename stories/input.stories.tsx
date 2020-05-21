import * as React from 'react';

import Input from '../src/components/Input'

export default { title: 'Input' };

export const common = () => (
	<Input
		animation
		disabledGetCode={false}
		animationCls="ota-form_anim"
		type="verify"
		placeholder="验证码"
	/>
)
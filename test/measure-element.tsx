import React, {useState, useRef, useEffect, FC} from 'react';
import test from 'ava';
import {spy} from 'sinon';
import delay from 'delay';
import {Box, Text, render, measureElement} from '../src';

test('measure element', async t => {
	const stdout = {
		write: spy(),
		columns: 100
	};

	const Test: FC = () => {
		const [width, setWidth] = useState(0);
		const ref = useRef();

		useEffect(() => {
			setWidth(measureElement(ref.current));
		}, []);

		return (
			<Box ref={ref}>
				<Text>Width: {width}</Text>
			</Box>
		);
	};

	const {rerender} = render(<Test />, {stdout, debug: true});
	t.is(stdout.write.firstCall.args[0], 'Width: 0');
	await delay(100);
	t.is(stdout.write.lastCall.args[0], 'Width: 100');
});

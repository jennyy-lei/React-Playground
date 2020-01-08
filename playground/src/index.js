import React from 'react';
import reactCSS from 'reactcss'
import ReactDOM from 'react-dom';
import './index.css';
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker, } from 'react-color'

class Component extends React.Component {
	state = {
		color: {
			hex: '#333',
			rgb: {
				r: 51,
				g: 51,
				b: 51,
				a: 1,
			},
			hsl: {
				h: 0,
				s: 0,
				l: .20,
				a: 1,
			},
		},
	};

	// handleChangeComplete = (color, event) => {
	// 	this.handleChange(color, event);
	// };

	handleChange = (color, event) => {
		this.setState({
			color: {
				hex: color.hex,
				rgb: color.rgb,
				hsl: color.hsl,
			}
		})
	};

	render() {
		const styles = reactCSS({
			'default': {
				color: {
					background: `rgba(${ this.state.color.rgb.r }, ${ this.state.color.rgb.g }, ${ this.state.color.rgb.b }, ${ this.state.color.rgb.a })`,
				},
				noBg: {
					background: `rgba(0, 0, 0, 0)`,
				}
			},
		});
		return(
			<div className='wrapper'>
				<div className='background' style={ styles.color } />
				<div className='picker'>
					<ChromePicker className='pickerBlock' color={ this.state.color.rgb } onChange={ this.handleChange } />
					<p> Chrome </p>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
  <Component />,
  document.getElementById('root')
);

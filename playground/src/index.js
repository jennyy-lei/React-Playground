import React from 'react';
import reactCSS from 'reactcss'
import ReactDOM from 'react-dom';
import './index.css';
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker, } from 'react-color'

class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: {
				hex: '#333333',
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
	}

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

	round = (n, i = 1) => {
		return Number((n).toFixed(i));
	}

	lightness = () => {
		return this.round(this.state.color.hsl.l * 100, 0);
	}

	render() {
		const styles = reactCSS({
			'default': {
				color: {
					background: `rgba(${ this.state.color.rgb.r }, ${ this.state.color.rgb.g }, ${ this.state.color.rgb.b }, ${ this.state.color.rgb.a})`,
				},
				noBg: {
					background: `rgba(0, 0, 0, 0)`,
				},
				text: {
					color: 'black',
					margin: 0,
					padding: '10px 0',
				}
			},
		});
		return(
			<div className='wrapper'>
				<div className='background' style={ styles.color }>
				</div>
				<div className='picker-wrapper'>
					<div className='picker'>
					<ChromePicker className='pickerBlock' color={ this.state.color.rgb } onChange={ this.handleChange } />
					<div className='text'> Chrome </div>
					</div>
				</div>
				<div className='content-wrapper'>
					<div className='top-half'>
						<h1 className='title'>Colour Picker</h1>

						<div className='code-wrapper'>
							<p>Hex: {this.state.color.hex}</p>
							<p>RGB: rgba({this.state.color.rgb.r}, {this.state.color.rgb.g}, {this.state.color.rgb.b}, {this.state.color.rgb.a})</p>
							<p>HSL: hsla({this.round((this.state.color.hsl.h * 100))}%, {this.round((this.state.color.hsl.s * 100))}%, {this.round((this.state.color.hsl.l * 100))}%, {this.state.color.hsl.a})</p>
						</div>
					</div>
					<div className='bot-half'>
						<div className='stack-wrapper'>
							<p style={ styles.text }>LIGHTNESS</p>

							<LightBar
								fill = { this.lightness() % 10 != 0 }
								color = { this.state.color.hsl }
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Rectangle extends React.Component {
	render() {
		const styles = reactCSS({
			'default': {
				color: {
					background: `hsla(${ this.props.h * 100 }, ${ this.props.s * 100 }%, ${ this.props.l * 100 }%, ${this.props.a})`,
				}
			},
		});
		return (
			<tr className='square-wrapper'>
				<td className='table-cell'>
					{this.props.l * 100} %
				</td>
				<td
					className="square"
					style={styles.color}
				>
				</td>
				<td className='table-cell'>
					{this.props.l}
				</td>
			</tr>
		);
	}
}

class LightBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: {
				h: Array(12).fill(this.props.color.h),
				s: Array(12).fill(this.props.color.s),
				l: this.fillArr( Array(12).fill(this.props.color.l) ),
				a: Array(12).fill(this.props.color.a),
			}
		};
	};

	fillArr(lst) {
		const _colors = lst.slice();

		for (let i = 0; i < 11; i++) {
			_colors[i] = i/10;
		}

		if (this.props.fill) {
			_colors[11] = this.props.color;
		} else {
			_colors[11] = 1000;
		}

		return _colors;
	}

	renderRect(i) {
		console.log((this.state.colors.h[i]));
		return (
			<Rectangle
				h = {this.state.colors.h[i]}
				s = {this.state.colors.s[i]}
				l = {this.state.colors.l[i]}
				a = {this.state.colors.a[i]}
			/>
		);
	}

	render() {
		if (!this.state.colors.h || !this.state.colors.s || !this.state.colors.l) {
			return null;
		}

		return(
			<div className='swatch-wrapper'>
				<table>
					{ this.renderRect( 0 ) }
					{ this.renderRect( 1 ) }
					{ this.renderRect( 2 ) }
					{ this.renderRect( 3 ) }
					{ this.renderRect( 4 ) }
					{ this.renderRect( 5 ) }
					{ this.renderRect( 6 ) }
					{ this.renderRect( 7 ) }
					{ this.renderRect( 8 ) }
					{ this.renderRect( 9 ) }
					{ this.renderRect( 10 ) }
					{ this.props.fill ? this.renderRect( 11 ) : null }
				</table>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
  <Component />,
  document.getElementById('root')
);

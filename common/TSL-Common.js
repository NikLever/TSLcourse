// Three.js Transpiler r172

import { uint, bool, vec3, ivec3, uvec2, uvec3, mul, Fn, float, floor, fract, mod, dot, uv, min, Loop, sub, int, exp2 } from 'three/tsl';

const UI0 = uint(1597334673);
const  UI1 = uint(3812015801);
const  UI2 = uvec2(UI0, UI1);
const  UI3 = uvec3(UI0, UI1, 2798796415);
const  UIF = float(1.0).div(float(0xffffffff));

const hash33 = /*#__PURE__*/ Fn( ( [ p_immutable ] ) => {

	const p = vec3( p_immutable ).toVar();
	const q = uvec3( uvec3( ivec3( p ) ).mul( UI3 ) ).toVar();
	q.assign( q.x.bitXor( q.y ).bitXor( q.z ).mul( UI3 ) );

	return float( - 1. ).add( mul( 2., vec3( q ) ).mul( UIF ) );

} ).setLayout( {
	name: 'hash33',
	type: 'vec3',
	inputs: [
		{ name: 'p', type: 'vec3' }
	]
} );

const remap = /*#__PURE__*/ Fn( ( [ x_immutable, a_immutable, b_immutable, c_immutable, d_immutable ] ) => {

	const d = float( d_immutable ).toVar();
	const c = float( c_immutable ).toVar();
	const b = float( b_immutable ).toVar();
	const a = float( a_immutable ).toVar();
	const x = float( x_immutable ).toVar();

	return x.sub( a ).div( b.sub( a ) ).mul( d.sub( c ) ).add( c );

} ).setLayout( {
	name: 'remap',
	type: 'float',
	inputs: [
		{ name: 'x', type: 'float' },
		{ name: 'a', type: 'float' },
		{ name: 'b', type: 'float' },
		{ name: 'c', type: 'float' },
		{ name: 'd', type: 'float' }
	]
} );

const gradientNoise = /*#__PURE__*/ Fn( ( [ x_immutable, freq_immutable ] ) => {

	const freq = float( freq_immutable ).toVar();
	const x = vec3( x_immutable ).toVar();
	const p = vec3( floor( x ) ).toVar();
	const w = vec3( fract( x ) ).toVar();
	const u = vec3( w.mul( w ).mul( w ).mul( w.mul( w.mul( 6. ).sub( 15. ) ).add( 10. ) ) ).toVar();
	const ga = vec3( hash33( mod( p.add( vec3( 0., 0., 0. ) ), freq ) ) ).toVar();
	const gb = vec3( hash33( mod( p.add( vec3( 1., 0., 0. ) ), freq ) ) ).toVar();
	const gc = vec3( hash33( mod( p.add( vec3( 0., 1., 0. ) ), freq ) ) ).toVar();
	const gd = vec3( hash33( mod( p.add( vec3( 1., 1., 0. ) ), freq ) ) ).toVar();
	const ge = vec3( hash33( mod( p.add( vec3( 0., 0., 1. ) ), freq ) ) ).toVar();
	const gf = vec3( hash33( mod( p.add( vec3( 1., 0., 1. ) ), freq ) ) ).toVar();
	const gg = vec3( hash33( mod( p.add( vec3( 0., 1., 1. ) ), freq ) ) ).toVar();
	const gh = vec3( hash33( mod( p.add( vec3( 1., 1., 1. ) ), freq ) ) ).toVar();
	const va = float( dot( ga, w.sub( vec3( 0., 0., 0. ) ) ) ).toVar();
	const vb = float( dot( gb, w.sub( vec3( 1., 0., 0. ) ) ) ).toVar();
	const vc = float( dot( gc, w.sub( vec3( 0., 1., 0. ) ) ) ).toVar();
	const vd = float( dot( gd, w.sub( vec3( 1., 1., 0. ) ) ) ).toVar();
	const ve = float( dot( ge, w.sub( vec3( 0., 0., 1. ) ) ) ).toVar();
	const vf = float( dot( gf, w.sub( vec3( 1., 0., 1. ) ) ) ).toVar();
	const vg = float( dot( gg, w.sub( vec3( 0., 1., 1. ) ) ) ).toVar();
	const vh = float( dot( gh, w.sub( vec3( 1., 1., 1. ) ) ) ).toVar();

	return va.add( u.x.mul( vb.sub( va ) ) ).add( u.y.mul( vc.sub( va ) ) ).add( u.z.mul( ve.sub( va ) ) ).add( u.x.mul( u.y ).mul( va.sub( vb ).sub( vc ).add( vd ) ) ).add( u.y.mul( u.z ).mul( va.sub( vc ).sub( ve ).add( vg ) ) ).add( u.z.mul( u.x ).mul( va.sub( vb ).sub( ve ).add( vf ) ) ).add( u.x.mul( u.y ).mul( u.z ).mul( va.negate().add( vb ).add( vc.sub( vd ) ).add( ve.sub( vf ).sub( vg ) ).add( vh ) ) );

} ).setLayout( {
	name: 'gradientNoise',
	type: 'float',
	inputs: [
		{ name: 'x', type: 'vec3' },
		{ name: 'freq', type: 'float' }
	]
} );

const worleyNoise = /*#__PURE__*/ Fn( ( [ uv_immutable, freq_immutable ] ) => {

	const freq = float( freq_immutable ).toVar();
	const uv = vec3( uv_immutable ).toVar();
	const id = vec3( floor( uv ) ).toVar();
	const p = vec3( fract( uv ) ).toVar();
	const minDist = float( 10000. ).toVar();

	Loop( { start: float( - 1. ), end: 1., name: 'x', type: 'float', condition: '<=' }, ( { x } ) => {

		Loop( { start: float( - 1. ), end: 1., name: 'y', type: 'float', condition: '<=' }, ( { y } ) => {

			Loop( { start: float( - 1. ), end: 1., name: 'z', type: 'float', condition: '<=' }, ( { z } ) => {

				const offset = vec3( x, y, z ).toVar();
				const h = vec3( hash33( mod( id.add( offset ), vec3( freq ) ) ).mul( .5 ).add( .5 ) ).toVar();
				h.addAssign( offset );
				const d = vec3( p.sub( h ) ).toVar();
				minDist.assign( min( minDist, dot( d, d ) ) );

			} );

		} );

	} );

	return sub( 1., minDist );

} ).setLayout( {
	name: 'worleyNoise',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec3' },
		{ name: 'freq', type: 'float' }
	]
} );

const perlinFbm = /*#__PURE__*/ Fn( ( [ p_immutable, freq_immutable, octaves_immutable ] ) => {

	const octaves = int( octaves_immutable ).toVar();
	const freq = float( freq_immutable ).toVar();
	const p = vec3( p_immutable ).toVar();
	const G = float( exp2( float( - .85 ) ) ).toVar();
	const amp = float( 1. ).toVar();
	const noise = float( 0. ).toVar();

	Loop( { start: int( 0 ), end: octaves }, ( { i } ) => {

		noise.addAssign( amp.mul( gradientNoise( p.mul( freq ), freq ) ) );
		freq.mulAssign( 2. );
		amp.mulAssign( G );

	} );

	return noise;

} ).setLayout( { 
	name: 'perlinFbm',
	type: 'float',
	inputs: [
		{ name: 'p', type: 'vec3' },
		{ name: 'freq', type: 'float' },
		{ name: 'octaves', type: 'int' }
	]
} );

const worleyFbm = /*#__PURE__*/ Fn( ( [ p_immutable, freq_immutable ] ) => {

	const freq = float( freq_immutable ).toVar();
	const p = vec3( p_immutable ).toVar();

	return worleyNoise( p.mul( freq ), freq ).mul( .625 ).add( worleyNoise( p.mul( freq ).mul( 2. ), freq.mul( 2. ) ).mul( .25 ) ).add( worleyNoise( p.mul( freq ).mul( 4. ), freq.mul( 4. ) ).mul( .125 ) );

} ).setLayout( {
	name: 'worleyFbm',
	type: 'float',
	inputs: [
		{ name: 'p', type: 'vec3' },
		{ name: 'freq', type: 'float' }
	]
} );

const pointInAABB = /*#__PURE__*/ Fn( ( [ pt, bbmin, bbmax ] ) => {

	return pt.x.greaterThanEqual(bbmin.x).and(pt.y.greaterThanEqual(bbmin.y)).and(pt.z.greaterThanEqual(bbmin.z)).and(pt.x.lessThanEqual(bbmax.x)).and( pt.y.lessThanEqual(bbmax.y)).and(pt.z.lessThanEqual(bbmax.z));

} ).setLayout( {
	name: 'pointInAABB',
	type: 'bool',
	inputs: [
    { name: 'pt', type: 'vec3' },
		{ name: 'bbmin', type: 'vec3' },
		{ name: 'bbmax', type: 'vec3' }
	]
} );

export { hash33, remap, gradientNoise, worleyNoise, perlinFbm, worleyFbm, pointInAABB }

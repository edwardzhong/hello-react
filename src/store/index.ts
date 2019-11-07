import * as base from './base';
import list from './list';
import { combineStore } from '@/common/store'

export default combineStore({
	base,
	list
});

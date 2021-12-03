import * as Vue from 'vue-tsx-support';
import humps from 'humps';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';

import Loading from '@moefe/vue-aplayer/assets/svg/loading.svg';
import LoopAll from '@moefe/vue-aplayer/assets/svg/loop-all.svg';
import LoopOne from '@moefe/vue-aplayer/assets/svg/loop-one.svg';
import LoopNone from '@moefe/vue-aplayer/assets/svg/loop-none.svg';
import Lrc from '@moefe/vue-aplayer/assets/svg/lrc.svg';
import Menu from '@moefe/vue-aplayer/assets/svg/menu.svg';
import OrderList from '@moefe/vue-aplayer/assets/svg/order-list.svg';
import OrderRandom from '@moefe/vue-aplayer/assets/svg/order-random.svg';
import Pause from '@moefe/vue-aplayer/assets/svg/pause.svg';
import Play from '@moefe/vue-aplayer/assets/svg/play.svg';
import Right from '@moefe/vue-aplayer/assets/svg/right.svg';
import Skip from '@moefe/vue-aplayer/assets/svg/skip.svg';
import VolumeDown from '@moefe/vue-aplayer/assets/svg/volume-down.svg';
import VolumeUp from '@moefe/vue-aplayer/assets/svg/volume-up.svg';
import VolumeOff from '@moefe/vue-aplayer/assets/svg/volume-off.svg';

const svgIconsList = [
  'loading',
  'loop-all',
  'loop-one',
  'loop-none',
  'lrc',
  'menu',
  'order-list',
  'order-random',
  'pause',
  'play',
  'right',
  'skip',
  'volume-down',
  'volume-up',
  'volume-off',
];

export interface IconProps {
  type: string;
}

@Component({
  components: {
    Loading,
    LoopAll,
    LoopOne,
    LoopNone,
    Lrc,
    Menu,
    OrderList,
    OrderRandom,
    Pause,
    Play,
    Right,
    Skip,
    VolumeDown,
    VolumeUp,
    VolumeOff,
  },
})
export default class Icon extends Vue.Component<IconProps> {
  @Prop({ type: String, required: true })
  private readonly type!: string;

  render(h: CreateElement) {
    const svg = svgIconsList.includes(this.type);
    if (!svg) {
      window.console.warn(`Icon ${this.type} not found`);
      return null;
    }
    return h(humps.pascalize(this.type), { props: {} }, []);
  }
}

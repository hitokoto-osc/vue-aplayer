import Vue from 'vue';
import Comopnent from 'vue-class-component';
import APlayerPlugin, { APlayer } from '@moefe/vue-aplayer';
import { sleep } from 'utils';
import './App.scss';

Vue.use<APlayer.InstallOptions>(APlayerPlugin, {
  productionTip: process.env.NODE_ENV !== 'development',
});

@Comopnent
export default class App extends Vue {
  private readonly aplayer0: APlayer.Options = {
    fixed: true,
    lrcType: 3,
    listMaxHeight: 100,
    preload: 'auto',
    audio: [],
  };

  private readonly aplayer1: APlayer.Options = {
    lrcType: 3,
    listMaxHeight: 98,
    preload: 'auto',
    audio: [],
  };

  mounted() {
    fetch('/music/data.json')
      .then((res) => res.json())
      .then((data: Array<APlayer.Audio>) => {
        const isSafari = /apple/i.test(navigator.vendor);
        if (isSafari) {
          for (let i = 0; i < data.length; i++) {
            // eslint-disable-next-line no-param-reassign
            data[i].speed = 1;
          }
        }
        this.aplayer1.audio = data.splice(0, 4);
        this.aplayer0.audio = data;
      });
  }

  render() {
    const { aplayer0, aplayer1 } = this;
    return (aplayer0.audio as unknown as APlayer.Audio[]).length &&
      (aplayer0.audio as unknown as APlayer.Audio[]).length ? (
      <div id="app">
        <APlayer {...{ props: aplayer0, ...aplayer0 }} />
        <div class="landing">
          <h1>Vue-Aplayer</h1>
          <h3>🍰 A beautiful HTML5 music player for Vue.js.</h3>
          <div class="aplayer-wrap">
            <APlayer {...{ props: aplayer1, ...aplayer1 }} />
          </div>
          <div class="landing-buttons">
            <a
              class="landing-button"
              href="https://github.com/MoePlayer/vue-aplayer"
              target="_blank"
            >
              GitHub
            </a>
            {/* eslint-disable-next-line no-script-url */}
            <a class="landing-button" href="/docs/">
              Docs
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div id="app">Loading...</div>
    );
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import store from 'store';
import VueClipboard from 'vue-clipboard2';
import '../modules/class-component-hooks';
import {
    QLayout,
    QInput,
    QCard,
    QCardMain,
    QCardTitle,
    QCardActions,
    QCardSeparator,
    QIcon,
    QBtn,
} from 'quasar';

Vue.use(VueClipboard);

@Component({
    name: 'welcome',
    components: {
        QLayout,
        QInput,
        QCard,
        QCardMain,
        QCardTitle,
        QCardActions,
        QCardSeparator,
        QIcon,
        QBtn,
    }
})
export default class Index extends Vue {
  copySucceeded1: boolean = false;

  get username () {
    return store.get('account').name;
  }

  get copyButtonText () {
    return this.copySucceeded1 ? 'Copied!' : 'Copy';
  }
  
  get copy () {
    return `https://data.travelchain.io/?r=${this.username}`;
  }

  beforeRouteEnter (to, from, next) {
    if (from.name === 'login') {
      location.reload();
      next();
    }
    next();
  }

}
'use babel';

import AtomProjectionistView from './atom-projectionist-view';
import { CompositeDisposable } from 'atom';

export default {

  atomProjectionistView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomProjectionistView = new AtomProjectionistView(state.atomProjectionistViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomProjectionistView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-projectionist:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomProjectionistView.destroy();
  },

  serialize() {
    return {
      atomProjectionistViewState: this.atomProjectionistView.serialize()
    };
  },

  toggle() {
    console.log('AtomProjectionist was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

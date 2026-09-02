// TextInput must be wrapped in Section({}, ...) - the Settings page's
// native bridge only mounts interactive components that way (see
// docs.zepp.com's TextInput example). A bare View() around it renders
// the label text but silently drops the input box.
AppSettingsPage({
  state: { props: {}, goal: '', glass: '' },
  setState(props) {
    this.state.props = props
    this.state.goal = props.settingsStorage.getItem('wtGoal') || ''
    this.state.glass = props.settingsStorage.getItem('wtGlass') || ''
  },
  build(props) {
    this.setState(props)
    return Section({ style: { padding: '12px' } }, [
      View({ style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' } }, ['Daily goal (glasses)']),
      Section({}, TextInput({
        value: this.state.goal, placeholder: '8',
        onChange: (val) => { this.state.goal = val; this.state.props.settingsStorage.setItem('wtGoal', val) },
      })),
      View({ style: { fontSize: '14px', fontWeight: 'bold', marginTop: '18px', marginBottom: '6px' } }, ['Glass size (ml)']),
      Section({}, TextInput({
        value: this.state.glass, placeholder: '250',
        onChange: (val) => { this.state.glass = val; this.state.props.settingsStorage.setItem('wtGlass', val) },
      })),
    ])
  },
})

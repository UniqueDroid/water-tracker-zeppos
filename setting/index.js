AppSettingsPage({
  state: { props: {}, goal: '', glass: '' },
  setState(props) {
    this.state.props = props
    this.state.goal = props.settingsStorage.getItem('wtGoal') || ''
    this.state.glass = props.settingsStorage.getItem('wtGlass') || ''
  },
  build(props) {
    this.setState(props)
    return View({ style: { padding: '12px' } }, [
      View({ style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' } }, ['Daily goal (glasses)']),
      TextInput({
        value: this.state.goal, placeholder: '8',
        onChange: (val) => { this.state.goal = val; this.state.props.settingsStorage.setItem('wtGoal', val) },
      }),
      View({ style: { fontSize: '14px', fontWeight: 'bold', marginTop: '18px', marginBottom: '6px' } }, ['Glass size (ml)']),
      TextInput({
        value: this.state.glass, placeholder: '250',
        onChange: (val) => { this.state.glass = val; this.state.props.settingsStorage.setItem('wtGlass', val) },
      }),
    ])
  },
})

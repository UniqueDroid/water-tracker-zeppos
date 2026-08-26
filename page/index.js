// Local water tracker. Count is persisted on the watch via the settings
// storage (device:os.local_storage permission). Goal + glass size are
// configurable in the Settings app. A new day resets the counter.
import * as hmUI from '@zos/ui'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../utils/config/device'

const KEY_COUNT = 'wt_count'
const KEY_DATE = 'wt_date'

Page({
  state: {},
  build() {
    try { this.buildUi() } catch (e) {
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 10, y: 10, w: DEVICE_WIDTH - 20, h: DEVICE_HEIGHT - 20,
        color: 0xff5555, text_size: 22, text_style: hmUI.text_style.WRAP,
        text: 'build() error:\n' + (e && (e.stack || e.message) || String(e)),
      })
    }
  },

  today() {
    const d = new Date()
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  },

  load() {
    const today = this.today()
    const savedDate = settings.settingsStorage.getItem(KEY_DATE) || ''
    if (savedDate !== today) {
      // new day -> reset, but remember the goal/size from settings
      settings.settingsStorage.setItem(KEY_DATE, today)
      settings.settingsStorage.setItem(KEY_COUNT, '0')
    }
    const goal = parseInt(settings.settingsStorage.getItem('wtGoal'), 10) || 8
    const glass = parseInt(settings.settingsStorage.getItem('wtGlass'), 10) || 250
    const count = parseInt(settings.settingsStorage.getItem(KEY_COUNT), 10) || 0
    return { goal, glass, count }
  },

  buildUi() {
    this.cfg = this.load()

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20, y: 30, w: DEVICE_WIDTH - 40, h: 40,
      color: 0xffffff, text_size: 28, align_h: hmUI.align.CENTER_H, text: 'Water',
    })

    this.countText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20, y: 80, w: DEVICE_WIDTH - 40, h: 70,
      color: 0x00bfff, text_size: 52, align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: this.cfg.count + ' / ' + this.cfg.goal,
    })

    this.barBg = hmUI.createWidget(hmUI.widget.RECT, {
      x: 40, y: 165, w: DEVICE_WIDTH - 80, h: 16, radius: 8, color: 0x333333,
    })
    this.barFill = hmUI.createWidget(hmUI.widget.RECT, {
      x: 40, y: 165, w: 0, h: 16, radius: 8, color: 0x00bfff,
    })

    this.mlText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20, y: 160, w: DEVICE_WIDTH - 40, h: 30,
      color: 0xcccccc, text_size: 20, align_h: hmUI.align.CENTER_H,
      text: (this.cfg.count * this.cfg.glass) + ' ml',
    })

    this.makeButton('+1 glass', 240, () => this.add(1))
    this.makeButton('-1 glass', 320, () => this.add(-1))
    this.makeButton('Reset day', 400, () => this.reset())
  },

  makeButton(label, y, onClick) {
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: (DEVICE_WIDTH - 300) / 2, y, w: 300, h: 60, radius: 12,
      normal_color: 0x3a3a3a, press_color: 0x555555,
      text_size: 26, color: 0xffffff, text: label, click_func: onClick,
    })
  },

  add(delta) {
    this.cfg.count = Math.max(0, this.cfg.count + delta)
    settings.settingsStorage.setItem(KEY_COUNT, String(this.cfg.count))
    this.render()
  },

  reset() {
    this.cfg.count = 0
    settings.settingsStorage.setItem(KEY_COUNT, '0')
    this.render()
  },

  render() {
    this.countText.setProperty(hmUI.prop.TEXT, this.cfg.count + ' / ' + this.cfg.goal)
    this.mlText.setProperty(hmUI.prop.TEXT, (this.cfg.count * this.cfg.glass) + ' ml')
    const pct = this.cfg.goal > 0 ? Math.min(1, this.cfg.count / this.cfg.goal) : 0
    this.barFill.setProperty(hmUI.prop.W, Math.round((DEVICE_WIDTH - 80) * pct))
  },
})

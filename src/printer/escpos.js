module.exports = {
    ESC: '\x1B',
    INIT: '\x1B@',
    SET_SPANISH: '\x1BR\x02',
    SET_CP437: '\x1Bt\x00',
    BOLD_ON: '\x1BE\x01',
    BOLD_OFF: '\x1BE\x00',
    ALIGN_CENTER: '\x1Ba\x01',
    ALIGN_LEFT: '\x1Ba\x00',
    ALIGN_RIGHT: '\x1Ba\x02',
    DOUBLE_HEIGHT: '\x1B!\x10',
    NORMAL_HEIGHT: '\x1B!\x00',
    CUT_PARTIAL: '\x1Bm',
    LINE_LENGTH: 42,
    get DIVIDER() { return '-'.repeat(this.LINE_LENGTH); }
};
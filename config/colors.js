export const themeConfig = [
  {
    id: "bgColor_default",
    variable: "--bgColor-default",
    label_key: "label_bgColor_default",
    compute: (bg, fg) => adjust(bg, { dl: 0 })
  },
  {
    id: "bgColor_muted",
    variable: "--bgColor-muted",
    label_key: "label_bgColor_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.08 })
  },
  {
    id: "bgColor_inset",
    variable: "--bgColor-inset",
    label_key: "label_bgColor_inset",
    compute: (bg, fg) => adjust(bg, { dl: -0.15 })
  },
  {
    id: "bgColor_emphasis",
    variable: "--bgColor-emphasis",
    label_key: "label_bgColor_emphasis",
    compute: (bg, fg) => adjust(bg, { dl: +0.10 })
  },
  {
    id: "bgColor_overlay",
    variable: "--bgColor-overlay",
    label_key: "label_bgColor_overlay",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "bgColor_attention_emphasis",
    variable: "--bgColor-attention-emphasis",
    label_key: "label_bgColor_attention_emphasis",
    compute: (bg, fg) => "#ae7c1426"
  },
  {
    id: "bgColor_attention_muted",
    variable: "--bgColor-attention-muted",
    label_key: "label_bgColor_attention_muted",
    compute: (bg, fg) => adjust(bg, { dl: +0.10 }) // 適宜調整
  },
  {
    id: "bgColor_danger_emphasis",
    variable: "--bgColor-danger-emphasis",
    label_key: "label_bgColor_danger_emphasis",
    compute: (bg, fg) => "#c93c37"
  },
  {
    id: "bgColor_danger_muted",
    variable: "--bgColor-danger-muted",
    label_key: "label_bgColor_danger_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "bgColor_success_emphasis",
    variable: "--bgColor-success-emphasis",
    label_key: "label_bgColor_success_emphasis",
    compute: (bg, fg) => "#347d39"
  },
  {
    id: "bgColor_success_muted",
    variable: "--bgColor-success-muted",
    label_key: "label_bgColor_success_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "bgColor_neutral_emphasis",
    variable: "--bgColor-neutral-emphasis",
    label_key: "label_bgColor_neutral_emphasis",
    compute: (bg, fg) => adjust(fg, { ds: -0.5, dl: -0.1 })
  },
  {
    id: "bgColor_neutral_muted",
    variable: "--bgColor-neutral-muted",
    label_key: "label_bgColor_neutral_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.12 })
  },
  {
    id: "bgColor_done_emphasis",
    variable: "--bgColor-done-emphasis",
    label_key: "label_bgColor_done_emphasis",
    compute: (bg, fg) => "#a371f7"
  },
  {
    id: "bgColor_done_muted",
    variable: "--bgColor-done-muted",
    label_key: "label_bgColor_done_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "bgColor_severe_emphasis",
    variable: "--bgColor-severe-emphasis",
    label_key: "label_bgColor_severe_emphasis",
    compute: (bg, fg) => "#bd5100"
  },
  {
    id: "bgColor_severe_muted",
    variable: "--bgColor-severe-muted",
    label_key: "label_bgColor_severe_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "bgColor_sponsors_emphasis",
    variable: "--bgColor-sponsors-emphasis",
    label_key: "label_bgColor_sponsors_emphasis",
    compute: (bg, fg) => "#bf3989"
  },
  {
    id: "bgColor_sponsors_muted",
    variable: "--bgColor-sponsors-muted",
    label_key: "label_bgColor_sponsors_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "bgColor_transparent",
    variable: "--bgColor-transparent",
    label_key: "label_bgColor_transparent",
    compute: (bg, fg) => "transparent"
  },
  {
    id: "bgColor_white",
    variable: "--bgColor-white",
    label_key: "label_bgColor_white",
    compute: (bg, fg) => "#ffffff"
  },
  {
    id: "bgColor_black",
    variable: "--bgColor-black",
    label_key: "label_bgColor_black",
    compute: (bg, fg) => "#000000"
  },
  {
    id: "fgColor_default",
    variable: "--fgColor-default",
    label_key: "label_fgColor_default",
    compute: (bg, fg) => fg.hex
  },
  {
    id: "fgColor_accent",
    variable: "--fgColor-accent",
    label_key: "label_fgColor_accent",
    compute: (bg, fg) => adjust(fg, { dh: +0.1 })
  },
  {
    id: "fgColor_muted",
    variable: "--fgColor-muted",
    label_key: "label_fgColor_muted",
    compute: (bg, fg) => adjust(fg, { ds: -0.3 })
  },
  {
    id: "fgColor_disabled",
    variable: "--fgColor-disabled",
    label_key: "label_fgColor_disabled",
    compute: (bg, fg) => adjust(fg, { ds: -0.5, dl: -0.2 })
  },
  {
    id: "fgColor_attention",
    variable: "--fgColor-attention",
    label_key: "label_fgColor_attention",
    compute: (bg, fg) => "#c69026"
  },
  {
    id: "fgColor_danger",
    variable: "--fgColor-danger",
    label_key: "label_fgColor_danger",
    compute: (bg, fg) => "#e5534b"
  },
  {
    id: "fgColor_success",
    variable: "--fgColor-success",
    label_key: "label_fgColor_success",
    compute: (bg, fg) => "#57ab5a"
  },
  {
    id: "fgColor_done",
    variable: "--fgColor-done",
    label_key: "label_fgColor_done",
    compute: (bg, fg) => "#a371f7"
  },
  {
    id: "fgColor_severe",
    variable: "--fgColor-severe",
    label_key: "label_fgColor_severe",
    compute: (bg, fg) => "#db6d28"
  },
  {
    id: "fgColor_sponsors",
    variable: "--fgColor-sponsors",
    label_key: "label_fgColor_sponsors",
    compute: (bg, fg) => "#db61a2"
  },
  {
    id: "fgColor_neutral",
    variable: "--fgColor-neutral",
    label_key: "label_fgColor_neutral",
    compute: (bg, fg) => adjust(fg, { ds: -0.5 })
  },
  {
    id: "borderColor_default",
    variable: "--borderColor-default",
    label_key: "label_borderColor_default",
    compute: (bg, fg) => adjust(bg, { dl: -0.25 })
  },
  {
    id: "borderColor_muted",
    variable: "--borderColor-muted",
    label_key: "label_borderColor_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.35 })
  },
  {
    id: "borderColor_emphasis",
    variable: "--borderColor-emphasis",
    label_key: "label_borderColor_emphasis",
    compute: (bg, fg) => adjust(bg, { dl: -0.15 })
  },
  {
    id: "borderColor_transparent",
    variable: "--borderColor-transparent",
    label_key: "label_borderColor_transparent",
    compute: (bg, fg) => "transparent"
  },
  {
    id: "borderColor_attention_emphasis",
    variable: "--borderColor-attention-emphasis",
    label_key: "label_borderColor_attention_emphasis",
    compute: (bg, fg) => "#966600"
  },
  {
    id: "borderColor_attention_muted",
    variable: "--borderColor-attention-muted",
    label_key: "label_borderColor_attention_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_danger_emphasis",
    variable: "--borderColor-danger-emphasis",
    label_key: "label_borderColor_danger_emphasis",
    compute: (bg, fg) => "#c93c37"
  },
  {
    id: "borderColor_danger_muted",
    variable: "--borderColor-danger-muted",
    label_key: "label_borderColor_danger_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_success_emphasis",
    variable: "--borderColor-success-emphasis",
    label_key: "label_borderColor_success_emphasis",
    compute: (bg, fg) => "#347d39"
  },
  {
    id: "borderColor_success_muted",
    variable: "--borderColor-success-muted",
    label_key: "label_borderColor_success_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_done_emphasis",
    variable: "--borderColor-done-emphasis",
    label_key: "label_borderColor_done_emphasis",
    compute: (bg, fg) => "#8957e5"
  },
  {
    id: "borderColor_done_muted",
    variable: "--borderColor-done-muted",
    label_key: "label_borderColor_done_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_severe_emphasis",
    variable: "--borderColor-severe-emphasis",
    label_key: "label_borderColor_severe_emphasis",
    compute: (bg, fg) => "#bd5100"
  },
  {
    id: "borderColor_severe_muted",
    variable: "--borderColor-severe-muted",
    label_key: "label_borderColor_severe_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_sponsors_emphasis",
    variable: "--borderColor-sponsors-emphasis",
    label_key: "label_borderColor_sponsors_emphasis",
    compute: (bg, fg) => "#bf3989"
  },
  {
    id: "borderColor_sponsors_muted",
    variable: "--borderColor-sponsors-muted",
    label_key: "label_borderColor_sponsors_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_neutral_emphasis",
    variable: "--borderColor-neutral-emphasis",
    label_key: "label_borderColor_neutral_emphasis",
    compute: (bg, fg) => adjust(bg, { dl: -0.30 })
  },
  {
    id: "borderColor_open_emphasis",
    variable: "--borderColor-open-emphasis",
    label_key: "label_borderColor_open_emphasis",
    compute: (bg, fg) => "#3fb950"
  },
  {
    id: "borderColor_open_muted",
    variable: "--borderColor-open-muted",
    label_key: "label_borderColor_open_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_closed_emphasis",
    variable: "--borderColor-closed-emphasis",
    label_key: "label_borderColor_closed_emphasis",
    compute: (bg, fg) => "#f85149"
  },
  {
    id: "borderColor_closed_muted",
    variable: "--borderColor-closed-muted",
    label_key: "label_borderColor_closed_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "borderColor_upsell_emphasis",
    variable: "--borderColor-upsell-emphasis",
    label_key: "label_borderColor_upsell_emphasis",
    compute: (bg, fg) => "#ab7df8"
  },
  {
    id: "borderColor_upsell_muted",
    variable: "--borderColor-upsell-muted",
    label_key: "label_borderColor_upsell_muted",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "header_bgColor",
    variable: "--header-bgColor",
    label_key: "label_header_bgColor",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "header_fgColor_logo",
    variable: "--header-fgColor-logo",
    label_key: "label_header_fgColor_logo",
    compute: (bg, fg) => fg.hex
  },
  {
    id: "header_borderColor_divider",
    variable: "--header-borderColor-divider",
    label_key: "label_header_borderColor_divider",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "headerSearch_bgColor",
    variable: "--headerSearch-bgColor",
    label_key: "label_headerSearch_bgColor",
    compute: (bg, fg) => adjust(bg, { dl: -0.12 })
  },
  {
    id: "headerSearch_borderColor",
    variable: "--headerSearch-borderColor",
    label_key: "label_headerSearch_borderColor",
    compute: (bg, fg) => adjust(bg, { dl: -0.25 })
  },
  {
    id: "button_primary_bgColor_rest",
    variable: "--button-primary-bgColor-rest",
    label_key: "label_button_primary_bgColor_rest",
    compute: (bg, fg) => "#238636"
  },
  {
    id: "button_primary_bgColor_hover",
    variable: "--button-primary-bgColor-hover",
    label_key: "label_button_primary_bgColor_hover",
    compute: (bg, fg) => "#2ea043"
  },
  {
    id: "button_primary_bgColor_active",
    variable: "--button-primary-bgColor-active",
    label_key: "label_button_primary_bgColor_active",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "button_primary_bgColor_disabled",
    variable: "--button-primary-bgColor-disabled",
    label_key: "label_button_primary_bgColor_disabled",
    compute: (bg, fg) => adjust(bg, { dl: -0.15 })
  },
  {
    id: "button_primary_borderColor_disabled",
    variable: "--button-primary-borderColor-disabled",
    label_key: "label_button_primary_borderColor_disabled",
    compute: (bg, fg) => "transparent"
  },
  {
    id: "button_outline_bgColor_rest",
    variable: "--button-outline-bgColor-rest",
    label_key: "label_button_outline_bgColor_rest",
    compute: (bg, fg) => "transparent"
  },
  {
    id: "button_outline_bgColor_hover",
    variable: "--button-outline-bgColor-hover",
    label_key: "label_button_outline_bgColor_hover",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "button_outline_bgColor_active",
    variable: "--button-outline-bgColor-active",
    label_key: "label_button_outline_bgColor_active",
    compute: (bg, fg) => adjust(bg, { dl: -0.15 })
  },
  {
    id: "button_outline_fgColor_rest",
    variable: "--button-outline-fgColor-rest",
    label_key: "label_button_outline_fgColor_rest",
    compute: (bg, fg) => fg.hex
  },
  {
    id: "button_outline_fgColor_hover",
    variable: "--button-outline-fgColor-hover",
    label_key: "label_button_outline_fgColor_hover",
    compute: (bg, fg) => fg.hex
  },
  {
    id: "button_outline_fgColor_active",
    variable: "--button-outline-fgColor-active",
    label_key: "label_button_outline_fgColor_active",
    compute: (bg, fg) => fg.hex
  },
  {
    id: "button_danger_bgColor_rest",
    variable: "--button-danger-bgColor-rest",
    label_key: "label_button_danger_bgColor_rest",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "button_danger_bgColor_hover",
    variable: "--button-danger-bgColor-hover",
    label_key: "label_button_danger_bgColor_hover",
    compute: (bg, fg) => "#da3633"
  },
  {
    id: "button_danger_bgColor_active",
    variable: "--button-danger-bgColor-active",
    label_key: "label_button_danger_bgColor_active",
    compute: (bg, fg) => "#b62324"
  },
  {
    id: "button_danger_fgColor_rest",
    variable: "--button-danger-fgColor-rest",
    label_key: "label_button_danger_fgColor_rest",
    compute: (bg, fg) => "#f85149"
  },
  {
    id: "button_danger_fgColor_hover",
    variable: "--button-danger-fgColor-hover",
    label_key: "label_button_danger_fgColor_hover",
    compute: (bg, fg) => "#ffffff"
  },
  {
    id: "button_danger_fgColor_active",
    variable: "--button-danger-fgColor-active",
    label_key: "label_button_danger_fgColor_active",
    compute: (bg, fg) => "#ffffff"
  },
  {
    id: "control_bgColor_rest",
    variable: "--control-bgColor-rest",
    label_key: "label_control_bgColor_rest",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "control_bgColor_hover",
    variable: "--control-bgColor-hover",
    label_key: "label_control_bgColor_hover",
    compute: (bg, fg) => adjust(bg, { dl: -0.08 })
  },
  {
    id: "control_bgColor_active",
    variable: "--control-bgColor-active",
    label_key: "label_control_bgColor_active",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "control_transparent_bgColor_rest",
    variable: "--control-transparent-bgColor-rest",
    label_key: "label_control_transparent_bgColor_rest",
    compute: (bg, fg) => "transparent"
  },
  {
    id: "control_transparent_bgColor_hover",
    variable: "--control-transparent-bgColor-hover",
    label_key: "label_control_transparent_bgColor_hover",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "control_transparent_bgColor_active",
    variable: "--control-transparent-bgColor-active",
    label_key: "label_control_transparent_bgColor_active",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "control_borderColor_selected",
    variable: "--control-borderColor-selected",
    label_key: "label_control_borderColor_selected",
    compute: (bg, fg) => "#f78166"
  },
  {
    id: "control_checked_bgColor_hover",
    variable: "--control-checked-bgColor-hover",
    label_key: "label_control_checked_bgColor_hover",
    compute: (bg, fg) => adjust(bg, { dl: -0.05 })
  },
  {
    id: "control_checked_bgColor_active",
    variable: "--control-checked-bgColor-active",
    label_key: "label_control_checked_bgColor_active",
    compute: (bg, fg) => adjust(bg, { dl: -0.10 })
  },
  {
    id: "control_checked_borderColor_hover",
    variable: "--control-checked-borderColor-hover",
    label_key: "label_control_checked_borderColor_hover",
    compute: (bg, fg) => adjust(bg, { dl: -0.20 })
  },
  {
    id: "control_checked_borderColor_active",
    variable: "--control-checked-borderColor-active",
    label_key: "label_control_checked_borderColor_active",
    compute: (bg, fg) => adjust(bg, { dl: -0.25 })
  }
];

function adjust(hsl, { dh = 0, ds = 0, dl = 0 }) {
    return hslToHex(
        (hsl.h + dh) % 1,
        Math.min(1, Math.max(0, hsl.s + ds)),
        Math.min(1, Math.max(0, hsl.l + dl))
    );
}


function hslToHex(h, s, l) {
    function f(n) {
        const k = (n + h * 12) % 12;
        const a = s * Math.min(l, 1 - l);
        const c = l - a * Math.max(
            -1,
            Math.min(k - 3, Math.min(9 - k, 1))
        );

        return Math.round(255 * c)
            .toString(16)
            .padStart(2, "0");
    }

    return `#${f(0)}${f(8)}${f(4)}`;
}



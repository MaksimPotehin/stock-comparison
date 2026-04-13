import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'text-success-800',
    'text-error-700'
  ],
  theme: {
    extend: {
      boxShadow: {
        card:     'var(--shadow-card)',
        dropdown: 'var(--shadow-dropdown)',
        modal:    'var(--shadow-modal)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: 'clamp(1.5rem, 4vw, 1.75rem) !important',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '0',
              marginBottom: '1rem'
            },
            h2: {
              fontSize: '1.25rem',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem'
            },
            h3: {
              fontSize: '1.125rem',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '1.25rem',
              marginBottom: '0.5rem'
            },
            p: {
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginTop: '0',
              marginBottom: '1rem'
            },
            ul: {
              fontSize: '0.95rem',
              lineHeight: '1.6'
            },
            ol: {
              fontSize: '0.95rem',
              lineHeight: '1.6'
            },
            blockquote: {
              fontSize: '0.95rem',
              lineHeight: '1.6'
            },
            '@media (min-width: 640px)': {
              h2: {
                fontSize: '1.5rem'
              },
              h3: {
                fontSize: '1.25rem'
              },
              p: {
                fontSize: '1rem'
              },
              ul: {
                fontSize: '1rem'
              },
              ol: {
                fontSize: '1rem'
              },
              blockquote: {
                fontSize: '1rem'
              }
            }
          }
        }
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#424452',
          700: '#374151',
          800: '#32323d',
          950: '#030712'
        },

        // ── Semantic brand tokens (map to CSS variables) ──────────────────────
        primary:  'var(--color-primary)',
        danger:   'var(--color-danger)',

        // Surface / layout
        card:       'var(--card-bg)',
        surface:    'var(--sb-input-bg)',
        'page-bg':  'var(--main-bg)',

        // Text
        'sb-text':      'var(--sb-dark)',
        'sb-secondary': 'var(--sb-text-dark65)',
        'sb-muted':     'var(--sb-text-dark50)',
        'sb-subtle':    'var(--sb-muted)',

        // Borders
        'sb-border':       'var(--sb-border-color)',
        'sb-border-light': 'var(--sb-light-border)',

        // Interactive
        'sb-hover':    'var(--sb-row-hovered-bg)',
        'sb-selected': 'var(--sb-row-selected-bg)',

        // Brand palette (direct access)
        'sb-primary':    'var(--sb-primary)',
        'sb-success':    'var(--sb-success)',
        'sb-warning':    'var(--sb-warning)',
        'sb-danger':     'var(--sb-danger)',
        'sb-info':       'var(--sb-info)',
        'sb-turquoise':  'var(--sb-turquoise)',
        'sb-magenta':    'var(--sb-magenta)',
        success: {
          DEFAULT: 'var(--color-success)',
          900: '#40BB54',
          800: '#5DD470',
          700: '#80ED92',
          600: '#A3FFB2',
          500: '#BDFFC7',
          400: '#D6FFDC'
        },

        warning: {
          DEFAULT: 'var(--color-warning)',
          900: '#F7A535',
          800: '#FFB44F',
          700: '#FFBF69',
          600: '#FFCA82',
          500: '#FFD59C',
          400: '#FFE0B5'
        },

        error: {
          DEFAULT: 'var(--color-danger)',
          900: '#D01E1E',
          800: '#EB3838',
          700: '#FF5757',
          600: '#FF7070',
          500: '#FF8A8A',
          400: '#FFA3A3'
        },

        info: {
          DEFAULT: 'var(--color-info)',
          900: '#4C7CA4',
          800: '#6995BA',
          700: '#8CAECA',
          600: '#AFC6DA',
          500: '#D2DFEA',
          400: '#F5F8FA'
        },

        // blue-metallic
        'blue-2': {
          DEFAULT: '#3B5781',
          900: '#3B5781',
          800: '#4B6FA4',
          700: '#6989BA',
          600: '#8CA5CA',
          500: '#AFC0DA',
          400: '#D2DBEA'
        },

        // blue-metallic-2
        'blue-3': {
          DEFAULT: '#2C5474',
          900: '#2C5474',
          800: '#3A6E98',
          700: '#4A88BA',
          600: '#6FA1C8',
          500: '#94B9D6',
          400: '#B9D1E4'
        },

        // blue-cyan
        'blue-4': {
          DEFAULT: '#1B83B3',
          900: '#1B83B3',
          700: '#4EB5E4',
          600: '#7AC7EB',
          500: '#A6DAF2',
          400: '#D3ECF8',
          300: '#F2FBFF'
        },

        green: {
          DEFAULT: '#4DA19B',
          900: '#4DA19B',
          800: '#6BB8B3',
          700: '#8DC9C4',
          600: '#B0D9D6',
          500: '#D2EAE8',
          400: '#F5FAFA'
        },

        red: {
          DEFAULT: '#DC2262',
          900: '#DC2262',
          800: '#E44E82',
          700: '#EB7AA1',
          600: '#F1A7C0',
          500: '#F8D3E0',
          400: '#FCE9EF'
        },

        purple: {
          DEFAULT: '#6B5BA3',
          900: '#6B5BA3',
          800: '#897CB6',
          700: '#A69DC8',
          600: '#C4BEDA',
          500: '#E1DEED',
          400: '#F0EFF6'
        },

        'pink-1': {
          DEFAULT: '#792484',
          900: '#792484',
          800: '#9E2FAC',
          700: '#BC43CC',
          600: '#CA6BD7',
          500: '#D893E1',
          400: '#E7BBEC'
        },

        'pink-2': {
          DEFAULT: '#EB73AB',
          900: '#EB73AB',
          800: '#F2A1C7',
          700: '#F8CEE2',
          600: '#FBE0EC',
          500: '#FCE9F2',
          400: '#FEF6FA'
        },

        orange: {
          DEFAULT: '#E26C0A',
          900: '#E26C0A',
          800: '#F58528',
          700: '#F8A159',
          600: '#FABD8A',
          500: '#FCD8BB',
          400: '#FEF4EB'
        },

        white: {
          DEFAULT: '#FFFFFF',
          900: '#FFFFFF',
          800: '#E6E6E6',
          700: '#F9FAFB',
          600: '#F2F4F7',
          500: '#EAECF0',
          400: '#D0D5DD'
        },

        black: {
          DEFAULT: '#17161A',
          900: '#17161A',
          800: '#282832',
          700: '#44414D',
          600: '#64616A',
          500: '#838187',
          400: '#949299'
        }
      }
    }
  }
}

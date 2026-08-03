/**
 * Analytics event name constants.
 *
 * Naming convention: CONTEXT_ACTION
 * All events are kebab-case strings (PostHog convention).
 * Keep this file as the single source of truth for event names.
 */
export const AnalyticsEvents = {
  // ── Navigation ─────────────────────────────────────────────────
  PAGE_VIEWED:              'page_viewed',
  NAV_LINK_CLICKED:         'nav_link_clicked',

  // ── Hero ────────────────────────────────────────────────────────
  HERO_CTA_PRIMARY:         'hero_cta_primary_clicked',
  HERO_CTA_SECONDARY:       'hero_cta_secondary_clicked',
  HERO_3D_INTERACTED:       'hero_3d_model_interacted',
  HERO_SCROLLED_PAST:       'hero_scrolled_past',

  // ── Products ────────────────────────────────────────────────────
  PRODUCT_CARD_CLICKED:     'product_card_clicked',
  PRODUCT_DETAIL_VIEWED:    'product_detail_viewed',
  PRODUCT_COMPARED:         'product_compared',
  ADD_TO_CART:              'add_to_cart',

  // ── Quiz ────────────────────────────────────────────────────────
  QUIZ_STARTED:             'quiz_started',
  QUIZ_STEP_COMPLETED:      'quiz_step_completed',
  QUIZ_COMPLETED:           'quiz_completed',
  QUIZ_ABANDONED:           'quiz_abandoned',

  // ── Content ─────────────────────────────────────────────────────
  FAQ_OPENED:               'faq_item_opened',
  BLOG_READ:                'blog_article_read',
  SCIENCE_STUDY_CLICKED:    'science_study_link_clicked',
  TESTIMONIAL_VIEWED:       'testimonial_viewed',

  // ── Conversion ──────────────────────────────────────────────────
  LEAD_FORM_SUBMITTED:      'lead_form_submitted',
  NEWSLETTER_SUBSCRIBED:    'newsletter_subscribed',
  HOME_DELIVERY_CTA:        'home_delivery_cta_clicked',
  STORE_LOCATOR_SEARCHED:   'store_locator_searched',
  STORE_LOCATOR_DIRECTIONS: 'store_locator_directions_clicked',

  // ── Engagement ──────────────────────────────────────────────────
  SCROLL_DEPTH_25:          'scroll_depth_25',
  SCROLL_DEPTH_50:          'scroll_depth_50',
  SCROLL_DEPTH_75:          'scroll_depth_75',
  SCROLL_DEPTH_100:         'scroll_depth_100',

  // ── Settings ────────────────────────────────────────────────────
  THEME_TOGGLED:            'theme_toggled',
  CONSENT_ACCEPTED:         'consent_accepted',
  CONSENT_REJECTED:         'consent_rejected',
  CONSENT_CUSTOMIZED:       'consent_customized',
} as const

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]
